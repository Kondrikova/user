package otus.restful.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
            existingUser.setEmail(user.getEmail());
            existingUser.setFirstName(user.getFirstName());
            existingUser.setLastName(user.getFirstName());
            existingUser.setPhone(user.getPhone());
            User updatedUser = userRepository.save(existingUser);
            return ResponseEntity.ok(updatedUser);
        }).orElseGet(()-> ResponseEntity.notFound().build());
    }
}