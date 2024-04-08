package com.rest.proj.domain.article.controller;

import com.rest.proj.domain.article.entity.Article;
import com.rest.proj.domain.article.service.ArticleService;
import com.rest.proj.domain.member.entity.Member;
import com.rest.proj.global.RsData.RsData;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    @Data
    public static class WriteRequest {
        @NotBlank
        private String subject;
        @NotBlank
        private String content;
    }

    @AllArgsConstructor
    @Getter
    public static class WriteResponse {
        private final Article article;
    }

    @PostMapping("")
    public RsData<WriteResponse> write (@Valid @RequestBody WriteRequest writeRequest) {

        RsData<Article> writeRs = this.articleService.create(null, writeRequest.getSubject(), writeRequest.getContent());

        if(writeRs.isFail()) return (RsData) writeRs;

        return RsData.of(
                writeRs.getResultCode(),
                writeRs.getMsg(),
                new WriteResponse(writeRs.getData())
        );
    }


    @Data
    public static class ModifyRequest {
        @NotBlank
        private String subject;
        @NotBlank
        private String content;
    }

    @AllArgsConstructor
    @Getter
    public static class ModifyResponse {
        private final Article article;
    }

    @PatchMapping("/{id}")
    public RsData modify(@Valid @RequestBody ModifyRequest modifyRequest, @PathVariable("id") Long id) {
       Optional<Article> optionalArticle = this.articleService.findById(id);

       if (optionalArticle.isEmpty()) return RsData.of(
               "F-1",
               "%d번 게시물은 존재하지 않습니다.".formatted(id),
               null
       );

       // 회원 권한 체크 canModify();

       RsData<Article> modifyRs = this.articleService.modify(optionalArticle.get(), modifyRequest.getSubject(), modifyRequest.getContent());

       return RsData.of(
               modifyRs.getResultCode(),
               modifyRs.getMsg(),
               new ModifyResponse(modifyRs.getData())
       );
    }

    @AllArgsConstructor
    @Getter
    public static class RemoveResponse {
        private final Article article;
    }

    @DeleteMapping("/{id}")
    public RsData<RemoveResponse> remove (@PathVariable("id") Long id) {
        Optional<Article> optionalArticle = this.articleService.findById(id);

        if (optionalArticle.isEmpty()) return RsData.of(
                "F-1",
                "%d번 게시물은 존재하지 않습니다.".formatted(id),
                null
        );

        RsData<Article> deleteRs = articleService.deleteById(id);

       return RsData.of(
                deleteRs.getResultCode(),
                deleteRs.getMsg(),
                new RemoveResponse(optionalArticle.get())
        );
    }

}
