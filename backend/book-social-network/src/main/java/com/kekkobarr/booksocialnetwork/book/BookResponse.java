package com.kekkobarr.booksocialnetwork.book;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookResponse {

    private Integer id;
    private String title;
    private String authorName;
    private String isbn;
    private String synopsis;
    private String owner;
    private byte[] cover;
    private double rate; //average of all the feedbacks to a specific * number of feedback
    private boolean archived;
    private boolean shareable;
}
