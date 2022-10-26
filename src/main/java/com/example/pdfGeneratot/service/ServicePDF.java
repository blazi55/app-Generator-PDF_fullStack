package com.example.pdfGeneratot.service;

import com.example.pdfGeneratot.CreatePDF;
import com.example.pdfGeneratot.repository.RepositoryPDF;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServicePDF {

    private final RepositoryPDF repositoryPDF;

    public CreatePDF importDates(CreatePDF createPDF) {
       return repositoryPDF.save(createPDF);
    }

    public void exportPDF(HttpServletResponse response) throws IOException, DocumentException {
        List<CreatePDF> all = (List<CreatePDF>) repositoryPDF.findAll();
        Long max = Long.MIN_VALUE;
        for (int i = 0; i < all.size(); i++) {
            if (all.get(i).getId() > max) {
                max = all.get(i).getId();
            }
        }
        if (max > 1) {
            Long min = Long.MAX_VALUE;
            for (int i = 0; i < all.size(); i++) {
                if (all.get(i).getId() < min) {
                    min = all.get(i).getId();
                }
            }
            CreatePDF createPDFToDelete = repositoryPDF.findById(min).orElseThrow();
            repositoryPDF.delete(createPDFToDelete);
        }
        CreatePDF createPDF = repositoryPDF.findById(max).orElseThrow();
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());
        document.open();
        Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA);
        fontTitle.setSize(18);
        Paragraph paragraph = new Paragraph(createPDF.getTitle(), fontTitle);
        paragraph.setAlignment(Paragraph.ALIGN_CENTER);

        Font fontParagraph = FontFactory.getFont(FontFactory.HELVETICA);
        fontParagraph.setSize(12);
        Paragraph paragraph1 = new Paragraph(createPDF.getDescription(), fontParagraph);
        paragraph1.setAlignment(Paragraph.ALIGN_JUSTIFIED);

        document.add(paragraph);
        document.add(paragraph1);
        document.close();
    }
}
