package com.example.pdfGeneratot.controller;

import com.example.pdfGeneratot.CreatePDF;
import com.example.pdfGeneratot.service.ServicePDF;
import com.itextpdf.text.DocumentException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@RequestMapping("pdf")
@RestController
@CrossOrigin
public class ControllerPDF {

    private final ServicePDF servicePDF;

    public ControllerPDF(ServicePDF servicePDF) {
        this.servicePDF = servicePDF;
    }

    @GetMapping("/find")
    public void export(HttpServletResponse httpServletResponse)
            throws DocumentException, IOException {
        httpServletResponse.setContentType("application/pdf");
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd:hh:mm:ss");
        String date = format.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=pdf_" + date + ".pdf";

        httpServletResponse.setHeader(headerKey, headerValue);
        this.servicePDF.exportPDF(httpServletResponse);
    }

    @PostMapping("/generate")
    public CreatePDF importPDF(@RequestBody CreatePDF createPDF) {
       return this.servicePDF.importDates(createPDF);
    }
}
