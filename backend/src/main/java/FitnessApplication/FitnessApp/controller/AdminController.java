package FitnessApplication.FitnessApp.controller;


import FitnessApplication.FitnessApp.service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AdminController {

    private final AuthorityService authorityService;

    @Autowired
    public AdminController(AuthorityService authorityService) {
        this.authorityService = authorityService;
    }

    // Endpoint that exposes the number of admins in the database
    @GetMapping("/admins/count")
    public int getNumberOfAdmins() {
        return authorityService.getNumberOfAdmins();
    }
}
