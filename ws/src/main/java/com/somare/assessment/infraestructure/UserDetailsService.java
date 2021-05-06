package com.somare.assessment.infraestructure;

import com.somare.assessment.repository.ProfessionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    @Autowired
    private ProfessionalRepository professionalRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        var professional = this.professionalRepository.findByEmail(username);

        if(professional.isEmpty()) {
            throw new UsernameNotFoundException(String.format("Nenhum profissional encontrado com o e-mail %s", username));
        }

        return new ProfessionalUserDetails(professional.get());
    }
}
