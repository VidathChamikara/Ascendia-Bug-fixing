package com.Ascendia.server.service.Project;

import com.Ascendia.server.dto.Project.ProjectDto;
import com.Ascendia.server.dto.Project.ProjectGetDto;
import com.Ascendia.server.entity.Administrator.User;
import org.springframework.web.multipart.MultipartFile;
import com.Ascendia.server.dto.Project.ProjectManagerUpdateDto;

import java.util.List;

public interface ProjectService {

    List<ProjectGetDto> getProjectsForUser(User user);

    ProjectDto createProject(ProjectDto projectDto, MultipartFile profileImage, String clientFirstName, String clientLastName, String consultantFirstName, String consultantLastName);

    List<ProjectDto> getAllProjects();

    void deactivateProjectById(Long projectId);

    ProjectDto updateProjectById(Long projectId, ProjectDto projectDto, MultipartFile profileImage);

    ProjectGetDto getProjectByProjectId(Long projectId);

    //Nethuni
    ProjectDto getProjectId(Long projectId);

    List<ProjectGetDto> getProjectsByPmId(Long pmId);

    //List<ProjectDto> getProjectsByPmId(String pmId);


    //List<ProjectDto> searchProject(String pmId, String query);

    //String calculateDuration(ProjectDto projectDto);

    Long getTotalJobsForProject(Long projectId);

    Long getCompletedJobsCountForProject(Long projectId);

    Long getEmployeeCountForProject(Long projectId);

    int getTaskCountForProject(Long projectId);

    void updateProjectManager(ProjectManagerUpdateDto projectManagerUpdateDto);

}