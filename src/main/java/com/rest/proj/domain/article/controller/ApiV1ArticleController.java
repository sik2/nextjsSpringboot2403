package com.rest.proj.domain.article.controller;

import com.rest.proj.domain.article.entity.Article;
import com.rest.proj.domain.article.service.ArticleService;
import com.rest.proj.global.RsData.RsData;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/articles")
public class ApiV1ArticleController {
    private final ArticleService articleService;

    @AllArgsConstructor
    @Getter
    public static class ArticlesResponse {
        private final List<Article> articles;
    }

    @GetMapping("")
    public RsData<ArticlesResponse> getArticles() {
        List<Article> articles = this.articleService.getList();

        return RsData.of("S-1", "성공", new ArticlesResponse(articles));
    }

    @AllArgsConstructor
    @Getter
    public  static class ArticleResponse {
        private final Article article;
    }

    @GetMapping("/{id}")
    public RsData<ArticleResponse> getArticle (@PathVariable("id") Long id) {
        return articleService.getArticle(id).map(article -> RsData.of(
                    "S-1",
                    "성공",
                    new ArticleResponse(article)
            )).orElseGet(() -> RsData.of(
                    "F-1",
                    "%d 번 게시물은 존재하지 않습니다.".formatted(id),
                    null
        ));
    }
}
