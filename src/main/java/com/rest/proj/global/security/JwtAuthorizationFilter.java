package com.rest.proj.global.security;

import com.rest.proj.domain.member.service.MemberService;
import com.rest.proj.global.RsData.RsData;
import com.rest.proj.global.rq.Rq;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {
    private final MemberService memberService;
    private final Rq rq;

    @Override
    @SneakyThrows
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) {
        if (!request.getRequestURI().startsWith("/api/")) {
            filterChain.doFilter(request, response);
            return;
        }

        if (request.getRequestURI().equals("/api/v1/members/login") || request.getRequestURI().equals("/api/v1/members/logout")) {
            filterChain.doFilter(request, response);
            return;
        }

        String accessToken = rq.getCookie("accessToken");
        // accessToken 검증 or refreshToken 발급
        if (!accessToken.isBlank()) {
            // 토큰 유효기간 검증
            if (!memberService.validateToken(accessToken)) {
                String refreshToken = rq.getCookie("refreshToken");

                RsData<String> rs = memberService.refreshAccessToken(refreshToken);
                rq.setCrossDomainCookie("accessToken", rs.getData());
            }

            // securityUser 가져오기
            SecurityUser securityUser = memberService.getUserFromAccessToken(accessToken);
            // 로그인 처리
            rq.setLogin(securityUser);
        }

        filterChain.doFilter(request, response);
    }


}
