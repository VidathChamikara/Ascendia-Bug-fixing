package com.Ascendia.server.controller.SiteManager;


import com.Ascendia.server.dto.SiteManager.CommentJobDto;
import com.Ascendia.server.dto.SiteManager.CommentResponseJobDto;
import com.Ascendia.server.service.SiteManager.CommentJobService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v2/commentjob")
@AllArgsConstructor
public class CommentJobController {



    private CommentJobService commentJobService;

    @PostMapping("/job/createComment")
    public ResponseEntity<CommentResponseJobDto> createJobComment(@RequestBody CommentJobDto commentJobDto) {
        if (commentJobDto == null ||  commentJobDto.getCommentedJobUser() == null || commentJobDto.getCommentedJobUser().getUserID() == null) {
            throw new IllegalArgumentException("Commented user information in CommentDto cannot be null");
        }

        if (commentJobDto.getJob() == null || commentJobDto.getJob().getJobId() == null) {
            throw new IllegalArgumentException("Task information in CommentDto cannot be null");
        }


        CommentResponseJobDto savedJobComment = commentJobService.createJobComment(commentJobDto);
        return new ResponseEntity<>(savedJobComment, HttpStatus.CREATED);
    }



    @GetMapping("/job/{jobId}")
    public ResponseEntity <List<CommentResponseJobDto>> getCommentsForJob(@PathVariable Long jobId){
        List<CommentResponseJobDto> commentJobs = commentJobService.getJobCommentsByJobId(jobId);
        return ResponseEntity.ok(commentJobs);
    }

    @GetMapping("all")
    public ResponseEntity <List<CommentJobDto>> getAllJobComment(){
        List<CommentJobDto> commentJobs = commentJobService.getAllJobComment();
        return ResponseEntity.ok(commentJobs);
    }

    @PutMapping("{id}")
    public ResponseEntity<CommentJobDto>updateJobComment(@PathVariable("id") int commentJobId,@RequestBody CommentJobDto updateJobComment){
        CommentJobDto commentJobDto =commentJobService.updateJobComment(commentJobId , updateJobComment);
        return ResponseEntity.ok(commentJobDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteJobComment(@PathVariable("id") int commentJobId ) {
        commentJobService.deleteJobComment(commentJobId);
        return ResponseEntity.ok("Comment is delete successfully");


    }


    }
