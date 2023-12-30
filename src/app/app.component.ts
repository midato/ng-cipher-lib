import { Component, OnInit } from '@angular/core';
import { CryptoService } from './app/services/crypto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ng-cipher-lib';

  constructor(
    private cryptoService: CryptoService,
  ) {
  }

  ngOnInit(): void {

    setTimeout(async () => {

      /*let value = 'NhWuUkvEcBMZS8XdZIm1nln5QoyecExFjk0i6dFV8ainBCfBYtiGPyh1bnL6rXe87WQF2/KKLw68nPaONyULcQLeO/GD1ELgkGF421AVSulQpctfG8Cv8GifcluLT2OcdQe6dx1LBhPL4i0deHuHejcL3gcuccsfLLsgdqlPmBgUM+M416uIDBdaSSiKcG0bYOn1yeSBryT9vu6cww+12A7CLT3wTeHzPwBlvm9C7r15E1zHuJi6uzN4J5j+qO+cgXqIVI+/qNbjbC2McAZSX8ufwDRYuZrnUeylpvuCsBrULKCzrJ0kSmsZriobIhj/nWEr1OI16bdsC7Z7NbYbONyMod4+lp/h44uVfaGk1Xwq7wh7lXyFXL4pz1jbWK8vZiqI1txgL6A2qTsOuPf8RKskO7Ytl59jLs8XJMZRGONWqXvKJ7gMsRaooi0chu5dJLFFimXboryFq/+ZY75Q12lTNiDJvq2R1mxrS8scuB/k0DMayDmJ0o/MApZfpDnmETcOjf84UiRGBfnf5jzlEosWkdIysm904eA1ZbjhWQ++LyA1r5cUXNOzyKcz8bbsyEeGfqBjc7NjK33k0pghlA==';
      let aesK = 'Do3VJxoVc9QBzMpk6/Vhh7xH0pqd+784Sva9BjNR6YY=';
      let hmacK = 'm0sfw6fhuU8vhvJoxZ0r6ZWFZmp26kRh97eihPJntfI=';
      const dec = await this.cryptoService.decryptAes(value, aesK, hmacK);
      console.log(dec);

      value = 'pruebas_pld@yopmail.com';
      aesK = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA45SIe9RDkgr7vCGPF4dY\nFrF8vZdJv44Puh7AXjaj2OQXUcm8eOFrar0w1rrEZMRB+pO1+QKGubERSgunw5YD\nYPOyG5t8tZepawxnQIXSQU7oEsqzTFShSjs5K6HoLafwwDxi6KD0pGWbOH8NvX3Q\nfjn4P8pHpiAn4ZOflbzG2BeJmzvlwrZRDHqGK/IXiDEsJn1AOob9QIkdTHfHgmU1\n95DjMXxfl4ZQDIV51qaIRHoWa2mXgxiO1GVD+t7/tNOmsQy2rJ3BaZi4p/eDkfX9\ndU1wsQTWn9ZHzmiIZaKu3vdFLg1wwVLlSsKxUuGLSLad2QE4wYtsBBD/OmhdNQi9\njQIDAQAB';
      const enc = await this.cryptoService.encryptRSA(value, aesK);
      console.log(enc);

      value = '720000';
      aesK = 'FA1JItJgBNK/KY0C1qv5S+ZGSVZiAReBLLZf+t46TYY=';
      hmacK = 'dnqHvZmuRgBk+w5TuRFIhg==';
      const encAes = await this.cryptoService.encryptAes(value, aesK, hmacK);
      ; // request entity too large
      console.log(encAes);*/


      // OAE
      let value = 'miguel.garcias@elektra.com.mx';
      // let publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA45SIe9RDkgr7vCGPF4dY\nFrF8vZdJv44Puh7AXjaj2OQXUcm8eOFrar0w1rrEZMRB+pO1+QKGubERSgunw5YD\nYPOyG5t8tZepawxnQIXSQU7oEsqzTFShSjs5K6HoLafwwDxi6KD0pGWbOH8NvX3Q\nfjn4P8pHpiAn4ZOflbzG2BeJmzvlwrZRDHqGK/IXiDEsJn1AOob9QIkdTHfHgmU1\n95DjMXxfl4ZQDIV51qaIRHoWa2mXgxiO1GVD+t7/tNOmsQy2rJ3BaZi4p/eDkfX9\ndU1wsQTWn9ZHzmiIZaKu3vdFLg1wwVLlSsKxUuGLSLad2QE4wYtsBBD/OmhdNQi9\njQIDAQAB';
      // let publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArHQ09caWERhxf9deHJr2AXwBUQuUdmjuZRRTAvkx+VkytEdycTgt8wNR53jjCCSeyK4EeeU04nzoTW6Sqh77gTK3T9rPy6QPjD7IrFNZeLwwDfy5SFe9G2vzbJ1geyMgSdBAMITOXK9cdAnsCC40dNfPKly3BCf2SI+6Z3zJXghJZfKa2iucGrpW1Jwnxdwbtf7gzYBwmdu7lCz7o93Fpc3Wd7vCCsjl+PafasuGBPPRhqwuo4fbNuTM6D0oaXWd6Y9HoQ6BanortLotoCXOWPCJxqyAU52V1H4lgxP8bgYPZFGRrrabgbqsvDivohSxj4xd822LleF7VZD9GtosUQIDAQAB';
      let publicKey = `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGoTDCEi7qSKYxEd7wO+K6g0RqNZ
t9GBWzU6+U7P2rOsH1o8Jgi/yrA2Ky8yLFcs5cu/9qdLkGHptm5eIDZb06NWyX+6
vRmJKdbtqsgRP4Ju2gBLBmLBn1I2ewKVuoWG1u1qBkHZSJdboGpj7Ne4ryqf3nJk
w8p9ugoOoSZDgY9hAgMBAAE=
-----END PUBLIC KEY-----`;
      const encryptedValue = await this.cryptoService.encryptRSAOAE(value, publicKey);
      console.log(encryptedValue);

      // let privateKey = 'MIIEpQIBAAKCAQEArHQ09caWERhxf9deHJr2AXwBUQuUdmjuZRRTAvkx+VkytEdycTgt8wNR53jjCCSeyK4EeeU04nzoTW6Sqh77gTK3T9rPy6QPjD7IrFNZeLwwDfy5SFe9G2vzbJ1geyMgSdBAMITOXK9cdAnsCC40dNfPKly3BCf2SI+6Z3zJXghJZfKa2iucGrpW1Jwnxdwbtf7gzYBwmdu7lCz7o93Fpc3Wd7vCCsjl+PafasuGBPPRhqwuo4fbNuTM6D0oaXWd6Y9HoQ6BanortLotoCXOWPCJxqyAU52V1H4lgxP8bgYPZFGRrrabgbqsvDivohSxj4xd822LleF7VZD9GtosUQIDAQABAoIBAFnrjeHJVl47nJLIPW407qj/e8BChXroY8WYv2ABh6k4dVPDHU0jufHIfWBwjBCm55RECFl2xgiCkK4vRZIm7YUEaMjekxLfzKuX4RLZswFdPsFMUWADP7uYoii0NqZ+Pku+pnmmBeQWG+L1eXkafoeeL4srJNKp86UKLGvhiS3Zz9QgvJKw2nYoe901Jh+nngzhO9MaTGWLgJa04aTMQCZ8qdA1gG6gQ9W9UnVEY7m8CzkSyXFXz/JlvZ/WY8Wl7PM9+2ovl4np5S4ZMaPBJvVm0/W22MsNDMo6fo8/yiGLu72QyY4X8zQVPp5rtPA1tYr9UcEnhi16AHvzDDUaoHECgYEA6sP2fzqYWisJz+d+deZXmcT2CUCscJJAeXmyH+DZreEJFmF2D+SHVx1+dcPSDFjfKgmL3u9l0A4gw4jVz3J64QulZtL/DhNKCj6/NFAjfd2lKx1pcHW3ZOkiMES1FxWPcj7SVkG/PDSetDRQu3mLUwWytch2fwCEGaSLJ6Q45ucCgYEAvA1oq29KCrdcfLH0lh5X58MxHHCGNkT6S2gFY44r8MrQy2Cu3zepQIp+EIVzfVeUALgk7+5gqbkZf+gUKihSIRg0n6CjplTesJQrGfA/IAmPUpSvKSTYUWhxYLgD6JoTNPHcjZIsQKz3objDZmO6zNaaEDiuDo3AhkufBOYFxAcCgYEApAyz30wu0jNo8+MsN27yn/1GgEi1NyS78SbdFfGlqx+pnf4U5h4nhPSTPe/Mg9xGdbWeC/b2CmEU/A5OelvhCgl9V1Dx8gAAqRAXxJKLepS7qlkvKOrZcKaIwXoBoVPrnUXQ7X2cCJIspHg6Qgc5GJbOvsCKLU1LAjA9HUJgkNkCgYEAjunp2A+Vx5seMK3VYZjh2YKf+isR9IBrb484OTa88hxQnZ92hrF4cVJPCCNDZ8h89Cb9+1HAKHxBgtFPMdK+x+Prajzc4fWx36RbNTU95A0f3PSeQbh8pTGoqIZwgf9GBYChyv2BoA1TjJYr+c5lEnMtVpKcxPa5j9Y8na5qR1UCgYEAiA4bqKD7cJy2GfNokZhxjej8Y9QGf8fKL4rhh3aIl4diQgUfi+1F12McPmlwsvfnsuIdGkt/eDdp0Phr/smYbEmKniYQBcHmLc97OH99TyNzySMVeZ5RrWP1WXLkWOeDOzpuZwKrUuXTDvHJfCsEqmlEujUWeGXxOVN/aOFZI2s=';
      let privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgGoTDCEi7qSKYxEd7wO+K6g0RqNZt9GBWzU6+U7P2rOsH1o8Jgi/
yrA2Ky8yLFcs5cu/9qdLkGHptm5eIDZb06NWyX+6vRmJKdbtqsgRP4Ju2gBLBmLB
n1I2ewKVuoWG1u1qBkHZSJdboGpj7Ne4ryqf3nJkw8p9ugoOoSZDgY9hAgMBAAEC
gYAf3hMRzXXWlwDGPrD09egVw4bJQoX3+h3Vsx79L3Lr8bUFnfZrQHt7TvrQVgl+
My3idYx7nDcHQ3icVcjlq9a74f3rWEvay3HNEbzsXJ2u1sQQt9nXXOg9iOqU9p+q
AVomE9GNa8hOsODxNWffSxGfDVz/bU0oeFtjSTpzAWlUwQJBAMYpUjfr2RReuprG
2c7tLrXtpxnGIUIJVwMj3HaG0QGdQk0gZXKNoME1acuX6URZN1CQVzo/G4HgxlmA
Z0z0gjkCQQCJCPU/bKprjdnFh9xmakIV5zF4yCA6o/PuJ39aazQLrckLWYnLR51h
OeRWNvB4dWNc4PScWEVi5+WGUtB3QVZpAkEAhCST/lSZaxsMhyApqPLDnnA/aVGV
ZgsCakakwql+gPwUdYgv/mbxl0X+KdVAqeJwn5nRgTcKKd7xhke5GzlGCQJAYkTH
Qk1VxL07friX5+WpMHXTd07kNckfAxjV7exUrU9ZjccO1nSrum4+fUj2lxtvPsqe
/4MZdvzfDr1Se0KiiQJAUPi1OdTw6UlpwNlRlYxY37vUL6jm/ZkdwASphYSFiDvT
0jixggBKdESb8lXS5MtNzn8b25E2iIPs8k/xER1SMA==
-----END RSA PRIVATE KEY-----`;
      const unencryptedValue = await this.cryptoService.decryptRSAOAEP(encryptedValue, privateKey);
      console.log(unencryptedValue);

      // await this.cryptoService.encrypt();
    });
  }

}
