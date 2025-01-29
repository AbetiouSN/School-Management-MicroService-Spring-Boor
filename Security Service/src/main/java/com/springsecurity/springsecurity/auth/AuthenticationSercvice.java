package com.springsecurity.springsecurity.auth;

import com.springsecurity.springsecurity.config.JwtService;
import com.springsecurity.springsecurity.user.Role;
import com.springsecurity.springsecurity.user.User;
import com.springsecurity.springsecurity.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang.RandomStringUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationSercvice {
    private final UserRepository repository;
    private  final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
      var user = User.builder()
              .firstname(request.getFirstname())
              .lastname(request.getLastname())
              .email(request.getEmail())
              .password(passwordEncoder.encode(request.getPassword()))
              .role(request.getRole())
              .build();
      repository.save(user);
      var jwtToken = jwtService.generateToken(user);
      return AuthenticationResponse.builder()
              .token(jwtToken)
              .userId(user.getId())
              .build();
    }

    // Méthode pour générer un mot de passe aléatoire
    private String generateRandomPassword(int length) {
        return RandomStringUtils.randomAlphanumeric(length);  // Utilisation de Apache Commons Lang pour générer une chaîne alphanumérique
    }

    public AuthenticationResponse registerWithoutPasswd(RegisterRequest request) {
        String generatedPassword = generateRandomPassword(12); // Vous pouvez ajuster la longueur si nécessaire

        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(generatedPassword))
                .role(request.getRole())
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userId(user.getId())
                .build();
    }

    public User findUserById(Integer userId) {
        return repository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User findUserByToken(String token) {
        // Extraire le username (ou userId) du token
        String username = jwtService.extrtactUsername(token);

        // Rechercher l'utilisateur dans la base de données par email ou userId
        return repository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }




    //update user
    public User updateUser(Integer id, String firstname, String lastname, String email) {
        // Récupération de l'utilisateur existant
        User user = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Mise à jour des champs
        if (firstname != null && !firstname.isEmpty()) {
            user.setFirstname(firstname);
        }
        if (lastname != null && !lastname.isEmpty()) {
            user.setLastname(lastname);
        }
        if (email != null && !email.isEmpty()) {
            user.setEmail(email);
        }

        // Sauvegarde de l'utilisateur mis à jour
        return repository.save(user);
    }


    //delete User by id
    public void deleteUserById(Integer id){
        User user = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (user != null){
            repository.delete(user);
            System.out.println("User deleted successfully");
        }
    }



}
