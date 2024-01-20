package FitnessApplication.FitnessApp.service;


import FitnessApplication.FitnessApp.entity.User;


import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(Integer id);
    void deleteUserById(Integer id);
    void saveUser(User user);
    void updateUser(User user);
    int getNumberOfUsers();
    int getMembershipDaysTotal();

}
