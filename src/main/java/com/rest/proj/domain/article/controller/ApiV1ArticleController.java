package com.rest.proj.domain.article.controller;

import com.rest.proj.domain.article.entity.Article;
import com.rest.proj.domain.article.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/articles")
public class ApiV1ArticleController {
    private final ArticleService articleService;
    @GetMapping("")
    public List<Article> getArticles() {
        List<Article> articles = this.articleService.getList();
        return articles;
    }

    @GetMapping("/{id}")
    public Article getArticle (@PathVariable("id") Long id) {
        Article article = this.articleService.getArticle(id);

        return article;
    }
}
