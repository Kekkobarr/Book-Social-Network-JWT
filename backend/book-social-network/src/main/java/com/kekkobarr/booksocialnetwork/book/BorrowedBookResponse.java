package com.kekkobarr.booksocialnetwork.book;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BorrowedBookResponse {

    private Integer id;
    private String title;
    private String authorName;
    private String isbn;
    private double rate; //average of all the feedbacks to a specific * number of feedback
    private boolean returned;
    private boolean returnApproved;
}
