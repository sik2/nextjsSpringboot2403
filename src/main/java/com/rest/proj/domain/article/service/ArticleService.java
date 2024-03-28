package com.rest.proj.domain.article.service;

import com.rest.proj.domain.article.entity.Article;
import com.rest.proj.domain.article.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;
    public List<Article> getList() {
        return this.articleRepository.findAll();
    }

    public Article getArticle(Long id) {
        Optional<Article> oq =this.articleRepository.findById(id);

        if (oq.isEmpty()) {
            return null;
        }

        return oq.get();
    }

    public void create(String subject, String content) {
        Article article = Article.builder()
                .subject(subject)
                .content(content)
                .build();

        this.articleRepository.save(article);
    }
}
