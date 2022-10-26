package com.example.pdfGeneratot;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.springframework.lang.NonNull;

import javax.persistence.*;

@Entity
@Table(name = "PDF")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatePDF {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column(name="LONG_DESCRIPTION" , length = 65535, columnDefinition="TEXT")
    @Type(type="text")
    private String description;

    @Column
    private Integer fontSizeTitle;

    @Column
    private Integer fontSizeDescription;
}
