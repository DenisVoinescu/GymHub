package FitnessApplication.FitnessApp.service;



import FitnessApplication.FitnessApp.entity.Item;
import FitnessApplication.FitnessApp.entity.User;
import FitnessApplication.FitnessApp.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }


    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Integer id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElseThrow(() -> new RuntimeException("User not found!"));
    }

    @Override
    public void deleteUserById(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    public void saveUser(User user) {
        if(userRepository.existsById(user.getId())){
            throw new RuntimeException("User already exists!");
        }else{
            userRepository.save(user);
        }
    }
    @Override
    public int getMembershipDaysTotal() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .mapToInt(User::getMembershipDays)
                .sum();
    }
    public int getNumberOfUsers() {
        List<User> users = userRepository.findAll();
        return users.size();
    }



    @Override
    public void updateUser(User user) {
        Integer userId = user.getId();

        Optional<User> existingUserOptional = userRepository.findById(userId);

        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();

            existingUser.setUsername(user.getUsername());
            existingUser.setMembershipDays(user.getMembershipDays());

            userRepository.save(existingUser);
        } else {
            throw new RuntimeException("User not found!");
        }

    }

}
