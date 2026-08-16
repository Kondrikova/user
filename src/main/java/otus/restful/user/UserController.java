package otus.restful.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @GetMapping("/users")
    public List<User> gerUsers() {
        return userRepository.findAll();
    }
    @GetMapping("/user/{userId}")
    public User gerUser(@PathVariable int userId) {
        return userRepository.findById(userId).orElseThrow(()-> new UserNotFoundException(userId));
    }
    @PostMapping("/user")
    public ResponseEntity<User> createUser(@RequestBody User newUser) {
        User createdUser = userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable int userId) {
        userRepository.findById(userId).ifPresentOrElse(
                user -> userRepository.deleteById(userId),
                () -> {
                    throw new UserNotFoundException(userId);
                });
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/user/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable int userId, @RequestBody User user) {
        return userRepository.findById(userId).map(existingUser -> {
            Optional.ofNullable(user.getUserName()).ifPresent(existingUser::setUserName);
            Optional.ofNullable(user.getFirstName()).ifPresent(existingUser::setFirstName);
            Optional.ofNullable(user.getLastName()).ifPresent(existingUser::setLastName);
            Optional.ofNullable(user.getEmail()).ifPresent(existingUser::setEmail);
            Optional.ofNullable(user.getPhone()).ifPresent(existingUser::setPhone);
            return ResponseEntity.ok(existingUser);
        }).orElseGet(()-> ResponseEntity.notFound().build());
    }
}