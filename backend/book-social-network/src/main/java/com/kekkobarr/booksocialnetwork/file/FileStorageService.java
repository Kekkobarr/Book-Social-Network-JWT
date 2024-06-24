package com.kekkobarr.booksocialnetwork.file;

import com.kekkobarr.booksocialnetwork.book.Book;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@Slf4j
@RequiredArgsConstructor
public class FileStorageService {

    @Value("${application.file.uploads.photos-output-path}")
    private String fileUploadPath = "./uploads";

    public String saveFile(@NonNull MultipartFile sourceFile, @NonNull Book book, @NonNull Integer userId) {
        final String fileUploadSubPath = "users" + File.separator + userId;
        return uploadFile(sourceFile, fileUploadSubPath);
    }

    private String uploadFile(@NonNull MultipartFile sourceFile, @NonNull String fileUploadSubPath) {
        final String finalUploadPath = fileUploadPath + File.separator + fileUploadSubPath;
        File targetFolder = new File(finalUploadPath);
        if(!targetFolder.exists()){
            boolean folderCreated = targetFolder.mkdirs();
            if(!folderCreated){
                log.warn("Failed to create target folder: " + targetFolder);
                return null;
            }
        }
        final String fileExtension = getFileExtension(sourceFile.getOriginalFilename());
        //./uploads/users/userId/current-milliseconds.jpg
        String targetFilePath = finalUploadPath + File.separator + System.currentTimeMillis() + "." + fileExtension;
        Path targetPath = Paths.get(targetFilePath);
        try {
            Files.write(targetPath, sourceFile.getBytes());
            log.info("File saved to " + targetFilePath);
            return targetFilePath;
        } catch (IOException e) {
            log.error("File was not saved", e);
        }
        return null;
    }

    private String getFileExtension(String fileName) {
        if(fileName == null || fileName.isEmpty()){
            return "";
        }
        //prenderemo le cose dopo il . Esempio: qualcosa.jpg avremo jpg
        int lastDotIndex = fileName.lastIndexOf(".");
        if(lastDotIndex == -1){
            return "";
        }
        // JPG -> jpg
        return  fileName.substring(lastDotIndex+1).toLowerCase();
    }
}
