package com.Ascendia.server.service.Store;

import com.Ascendia.server.dto.Store.MaterialDto;

import java.util.List;

public interface MaterialService {
    MaterialDto createMaterial(MaterialDto materialDto);

    MaterialDto getMaterialById(Long materialId);

    List<MaterialDto> getAllMaterials();

    MaterialDto editMaterial(Long materialId, MaterialDto editedMaterial);

    void deleteMaterial(Long materialId);

    List<MaterialDto> searchMaterial(String query);
}
