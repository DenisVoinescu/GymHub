package FitnessApplication.FitnessApp.service;


import FitnessApplication.FitnessApp.entity.Authority;
import FitnessApplication.FitnessApp.repository.AuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorityServiceImpl implements AuthorityService {
    private final AuthorityRepository authorityRepository;

    @Autowired
    public AuthorityServiceImpl(AuthorityRepository authorityRepository){
        this.authorityRepository = authorityRepository;
    }
    @Override
    public List<Authority> findAll() {
        return authorityRepository.findAll();
    }

    @Override
    public Authority findById(int theId) {
        Optional<Authority> authority = authorityRepository.findById(theId);
        if(authority.isPresent())
            return authority.get();
        else
            throw new RuntimeException("Authority with id "+theId+" not found.");
    }

    @Override
    public List<Authority> findByUsername(String theUsername) {
        List<Authority> authorities = authorityRepository.findByUsername(theUsername);

        if (!authorities.isEmpty()) {
            return authorities;
        } else {
            throw new RuntimeException("Authorities for username " + theUsername + " not found.");
        }
    }
    public int getNumberOfAdmins() {
        List<Authority> adminAuthorities = authorityRepository.findByRole("ROLE_ADMIN");
        return adminAuthorities.size();
    }


    @Override
    public void save(Authority theAuthority) {
        authorityRepository.save(theAuthority);
    }

    @Override
    public void deleteById(int theId) {
        authorityRepository.deleteById(theId);
    }

}
