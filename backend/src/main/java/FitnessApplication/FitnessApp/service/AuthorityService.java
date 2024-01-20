package FitnessApplication.FitnessApp.service;



import FitnessApplication.FitnessApp.entity.Authority;

import java.util.List;

public interface AuthorityService {
    List<Authority> findAll();
    Authority findById(int theId);
    List <Authority> findByUsername(String username);
    int getNumberOfAdmins();
    void save(Authority theAuthority);

    void deleteById(int theId);
}
