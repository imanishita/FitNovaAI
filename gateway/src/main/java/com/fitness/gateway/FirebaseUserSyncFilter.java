package com.fitness.gateway;

import com.fitness.gateway.user.RegisterRequest;
import com.fitness.gateway.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

/**
 * This filter ensures that the X-User-ID header from the frontend
 * is preserved and passed through to downstream services.
 * 
 * JWT validation is handled by Spring Security's oauth2ResourceServer.
 * User registration is handled by the frontend calling /api/users/register.
 */
@Component
@Slf4j
@RequiredArgsConstructor
public class FirebaseUserSyncFilter implements WebFilter {

    private final UserService userService;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        // The X-User-ID header is already set by the frontend.
        // Spring Security's oauth2ResourceServer handles JWT validation.
        // Just pass the request through.
        String userId = exchange.getRequest().getHeaders().getFirst("X-User-ID");
        if (userId != null) {
            log.debug("Request has X-User-ID: {}", userId);
        }
        return chain.filter(exchange);
    }
}
