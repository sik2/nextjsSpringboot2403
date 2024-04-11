package com.rest.proj.domain.member.service;

import com.rest.proj.domain.member.entity.Member;
import com.rest.proj.domain.member.repository.MemberRepository;
import com.rest.proj.global.RsData.RsData;
import com.rest.proj.global.jwt.JwtProvider;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;

    public Member join(String username, String password, String email) {
        Member member = Member.builder()
                .username(username)
                .password(password)
                .email(email)
                .build();

        memberRepository.save(member);

        return member;
    }

    @AllArgsConstructor
    @Getter
    public static class AuthAndMakeTokensResponseBody {
        private Member member;
        private String accessToken;

    }

    @Transactional
    public RsData<AuthAndMakeTokensResponseBody> authAndMakeTokens(String username, String password) {
        Member member = this.memberRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("사용자가 존재하지 않습니다."));

        // 시간 설정 및 토큰 생성
        String accessToken = jwtProvider.genToken(member, 60 * 60 * 5);

        System.out.println("accessToken : " + accessToken);
        
        return RsData.of("200-1", "로그인 성공", new AuthAndMakeTokensResponseBody(member, accessToken));
    }
}
