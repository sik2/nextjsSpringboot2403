package com.rest.proj.domain.article.ArticleDto;

import com.rest.proj.domain.article.entity.Article;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ArticleDto {
    private long id;
    private String subject;
    private String author;
    private LocalDateTime createdDate;

    public ArticleDto(Article article) {
        this.id = article.getId();
        this.subject = article.getSubject();
        this.author = article.getAuthor().getUsername();
        this.createdDate = article.getCreatedDate();
    }

}
