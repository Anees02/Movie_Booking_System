package com.bookingapi.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
@Slf4j
public class AWSservice {
    @Value("${application.bucket.name}")
    private String bucket;

    @Autowired
    private AmazonS3 s3client;

    public String uploadFile(MultipartFile file){
        File convertedFile = convertToFile(file);
        String filename = System.currentTimeMillis()+"_"+file.getOriginalFilename();
        s3client.putObject(new PutObjectRequest(bucket,filename,convertedFile));

        convertedFile.delete();

        return "https://myawsimage12.s3.amazonaws.com/"+filename;
    }

    public byte[] downloadFile(String filename){
        S3Object s3object = s3client.getObject(bucket,filename);
        S3ObjectInputStream inputStream = s3object.getObjectContent();

        try {
            return IOUtils.toByteArray(inputStream);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public String delete(String filename){
        s3client.deleteObject(bucket,filename);
        return "delete suceess";
    }

    private File convertToFile(MultipartFile file){
        File convertFile = new File(file.getOriginalFilename());
        try(FileOutputStream fos = new FileOutputStream(convertFile)){
            fos.write(file.getBytes());
            return convertFile;
        }catch(Exception e){
            System.out.println(e);
        }
        return null;
    }
}

