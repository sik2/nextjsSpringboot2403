package com.rest.proj.domain.member.controller;

import com.rest.proj.domain.member.dto.MemberDto;
import com.rest.proj.domain.member.entity.Member;
import com.rest.proj.domain.member.service.MemberService;
import com.rest.proj.global.RsData.RsData;
import com.rest.proj.global.rq.Rq;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class ApiV1memberController {
    private final MemberService memberService;
    private final Rq rq;

    @Getter
    public static class LoginRequestBody {
        @NotBlank
        private String username;
        @NotBlank
        private String password;
    }

    @Getter
    @AllArgsConstructor
    public static class LoginResponseBody {
        private MemberDto memberDto;
    }

    @PostMapping("/login")
    public RsData<LoginResponseBody> login (@Valid @RequestBody LoginRequestBody loginRequestBody) {

        RsData<MemberService.AuthAndMakeTokensResponseBody> authAndMakeTokensRs = memberService.authAndMakeTokens(loginRequestBody.getUsername(), loginRequestBody.getPassword());

        // 쿠키에 accessToken, refreshToken 토큰 넣기
        rq.setCrossDomainCookie("accessToken", authAndMakeTokensRs.getData().getAccessToken());
        rq.setCrossDomainCookie("refreshToken", authAndMakeTokensRs.getData().getRefreshToken());

        return RsData.of(authAndMakeTokensRs.getResultCode(),authAndMakeTokensRs.getMsg(), new LoginResponseBody(new MemberDto(authAndMakeTokensRs.getData().getMember())));
    }

    @Getter
    @AllArgsConstructor
    public static class MeResponseBody {
        private final MemberDto member;
    }

    @GetMapping("/me")
    public RsData<MeResponseBody> me () {
        Member member = rq.getMember();

        return RsData.of(
                "200",
                "내 정보 조회 성공",
                new MeResponseBody(new MemberDto(member))
        );
    }

    @PostMapping("/logout")
    public RsData<Void> logout() {
        rq.removeCrossDomainCookie("accessToken");
        rq.removeCrossDomainCookie("refreshToken");
        
        return RsData.of("200", "로그아웃 성공");
    }

}
