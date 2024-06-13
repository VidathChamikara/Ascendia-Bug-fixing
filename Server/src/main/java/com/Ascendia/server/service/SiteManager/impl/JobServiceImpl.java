package com.Ascendia.server.service.SiteManager.impl;


import com.Ascendia.server.dto.SiteManager.JobDto;
import com.Ascendia.server.entity.SiteManager.Job;
import com.Ascendia.server.exceptions.ResourceNotFoundException;
import com.Ascendia.server.mapper.SiteManager.JobMapper;
import com.Ascendia.server.repository.ProjectManager.TaskRepository;
import com.Ascendia.server.repository.SiteManager.JobRepository;
import com.Ascendia.server.service.SiteManager.JobService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class JobServiceImpl implements JobService {

    private JobRepository jobRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public List<JobDto> getJobsByTaskId(Long taskId) {
        List<Job> jobs = jobRepository.findByTaskTaskId(taskId);
        return jobs.stream().map(JobMapper::mapToJobDto).collect(Collectors.toList());
    }

    @Override
    public boolean areAllJobsCompletedForTask(Long taskId) {
        return jobRepository.areAllJobsCompletedForTask(taskId);

    }

    @Override
    public List<JobDto> searchJob(Long taskId, String query) {
        List<Job> jobs =  jobRepository.searchJob(taskId, query);
        return jobs.stream().map(JobMapper::mapToJobDto)
                .collect(Collectors.toList());
    }


   @Override
    public void markJobAsCompletedById(Long jobId) {
        Job job = jobRepository.findById(jobId).orElseThrow(
                () -> new ResourceNotFoundException("Job is not in exists with given id : " + jobId)
        );

        // Update job properties
        job.setDone(true);
        job.setStatus("Completed");

        // Save the updated task
        Job updatedJob = jobRepository.save(job);
    }

    @Override
    public String updateJobStatus(Long jobId) {
        Job job = jobRepository.findById(jobId).orElseThrow(
                () -> new ResourceNotFoundException("Job does not exist with given id: " + jobId)
        );
        // Calculate and update the job status
        String newStatus = calculateStatus(job);
        // If the job status is different, update it
        if (!newStatus.equals(job.getStatus())) {
            job.setStatus(newStatus);
            jobRepository.save(job);
        }

        return newStatus;
    }

    public String calculateStatus(Job job) {
        LocalDate currentDate = LocalDate.now();
        if (!job.isDone()) {
            if (currentDate.isBefore(job.getStartDate())) {
                return "Scheduled";
            } else if (currentDate.isAfter(job.getEndDate())) {
                return "Overdue";
            } else {
                return "In-Progress";
            }
        } else {
            return "Completed";
        }
    }


//
//    @Override
//    public JobDto createJob(JobDto jobDto) {
//        // Assuming jobDto contains taskId
//        // Retrieve tasks details from the database based on taskId
//        Optional<Task> taskOptional = taskRepository.findById(jobDto.getTask().getTaskId());
//
//        // Check if the project exists
//        if (taskOptional.isPresent()) {
//            // Set the project details in the jobDto
//            jobDto.setTask(taskOptional.get());
//
//            Job job = JobMapper.mapToJob(jobDto);
//            // Calculate the status
//           // Job.JobStatus status = job.calculateStatus();
//
////job.setJobStatus(status);
//            Job savedJob = jobRepository.save(job);
//            return JobMapper.mapToJobDto(savedJob);
//        } else {
//            // Handle the case where the project does not exist
//            // For example, throw an exception or return null
//            throw new ResourceNotFoundException("Task not found with ID: " + jobDto.getTask().getTaskId());
//        }
//    }

    @Override
    public JobDto createJob(JobDto jobDto) {
        Job job = JobMapper.mapToJob(jobDto);
        Job savedJob = jobRepository.save(job);
        return JobMapper.mapToJobDto(savedJob);
    }

    @Override
    public JobDto getJobById(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(()-> new ResourceNotFoundException( "Job is not exist with given id "));
        return JobMapper.mapToJobDto(job);
    }

    @Override
    public List<JobDto> getAllJob() {
        List<Job> jobs= jobRepository.findAll();
        return jobs.stream().map(job -> JobMapper.mapToJobDto(job))
                .collect(Collectors.toList());
    }

    @Override
    public JobDto updateJob(Long jobId, JobDto updatedJob) {

        Job job=jobRepository.findById(jobId).orElseThrow(
                () -> new ResourceNotFoundException("job is  not exist with given is : "+ jobId)
        );
        job.setJobName(updatedJob.getJobName());
        job.setDescription(updatedJob.getDescription());
        job.setEndDate(updatedJob.getEndDate());
        job.setStartDate(updatedJob.getStartDate());
        job.setStatus(updatedJob.getStatus());

        Job updateJobObj = jobRepository.save(job);

        return JobMapper.mapToJobDto(updateJobObj);

    }

    @Override
    public void deleteJob(Long jobId) {

        Job job= jobRepository.findById(jobId).orElseThrow(
                () -> new ResourceNotFoundException("job is  not exist with given is : "+ jobId)
        );
        jobRepository.deleteById(jobId);

    }



}