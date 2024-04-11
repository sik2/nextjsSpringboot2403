package com.rest.proj.domain.member.dto;

import com.rest.proj.domain.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class MemberDto {
    private long id;
    private String username;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public MemberDto(Member member) {
        this.id = member.getId();
        this.username = member.getUsername();
        this.createdDate = member.getCreatedDate();
        this.modifiedDate = member.getModifiedDate();
    }
}
