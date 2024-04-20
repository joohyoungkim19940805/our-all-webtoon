package com.our.all.webtoon.web.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.our.all.webtoon.config.security.JwtVerifyHandler;
import com.our.all.webtoon.repository.account.AccountRepository;
import com.our.all.webtoon.service.AccountService;
import com.our.all.webtoon.service.MailService;

@Component
public class AccountHandler {

    @Autowired
    private AccountService accountService;

    @Autowired
    private MailService mailService;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JwtVerifyHandler jwtVerifyHandler;
}
