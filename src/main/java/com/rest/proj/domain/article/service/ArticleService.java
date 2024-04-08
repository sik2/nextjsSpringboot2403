package com.rest.proj.domain.article.service;

import com.rest.proj.domain.article.entity.Article;
import com.rest.proj.domain.article.repository.ArticleRepository;
import com.rest.proj.domain.member.entity.Member;
import com.rest.proj.global.RsData.RsData;
import jakarta.transaction.Transactional;
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

    public Optional<Article> getArticle(Long id) {
        return this.articleRepository.findById(id);
    }

    @Transactional
    public RsData<Article> create(Member member, String subject, String content) {
        Article article = Article.builder()
                .author(member)
                .subject(subject)
                .content(content)
                .build();

        this.articleRepository.save(article);

        return RsData.of(
                "S-3",
                "게시물이 생성 되었습니다.",
                article
        );
    }

    public Optional<Article> findById(Long id) {
        return articleRepository.findById(id);
    }

    public RsData<Article> modify(Article article, String subject, String content) {
        article.setSubject(subject);
        article.setContent(content);
        articleRepository.save(article);

        return RsData.of(
                "S-4",
                "%d번 게시물이 수정 되었습니다.".formatted(article.getId()),
                article
        );
    }
    public RsData<Article> deleteById(Long id) {
        articleRepository.deleteById(id);

        return RsData.of(
                "S-5",
                "%d번 게시물이 삭제 되었습니다.".formatted(id),
                null
        );
    }
}
