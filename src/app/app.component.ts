import {Component, OnInit} from '@angular/core';
import {CryptoService} from "./app/services/crypto.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-cipher-lib';

  constructor(private cryptoService: CryptoService) {
  }

  ngOnInit(): void {

    setTimeout(async () => {
      let value = "NhWuUkvEcBMZS8XdZIm1nln5QoyecExFjk0i6dFV8ainBCfBYtiGPyh1bnL6rXe87WQF2/KKLw68nPaONyULcQLeO/GD1ELgkGF421AVSulQpctfG8Cv8GifcluLT2OcdQe6dx1LBhPL4i0deHuHejcL3gcuccsfLLsgdqlPmBgUM+M416uIDBdaSSiKcG0bYOn1yeSBryT9vu6cww+12A7CLT3wTeHzPwBlvm9C7r15E1zHuJi6uzN4J5j+qO+cgXqIVI+/qNbjbC2McAZSX8ufwDRYuZrnUeylpvuCsBrULKCzrJ0kSmsZriobIhj/nWEr1OI16bdsC7Z7NbYbONyMod4+lp/h44uVfaGk1Xwq7wh7lXyFXL4pz1jbWK8vZiqI1txgL6A2qTsOuPf8RKskO7Ytl59jLs8XJMZRGONWqXvKJ7gMsRaooi0chu5dJLFFimXboryFq/+ZY75Q12lTNiDJvq2R1mxrS8scuB/k0DMayDmJ0o/MApZfpDnmETcOjf84UiRGBfnf5jzlEosWkdIysm904eA1ZbjhWQ++LyA1r5cUXNOzyKcz8bbsyEeGfqBjc7NjK33k0pghlA==";
      let aesK = "Do3VJxoVc9QBzMpk6/Vhh7xH0pqd+784Sva9BjNR6YY=";
      const hmacK = "m0sfw6fhuU8vhvJoxZ0r6ZWFZmp26kRh97eihPJntfI=";
      const dec = await this.cryptoService.decryptAes(value, aesK, hmacK);
      console.log(dec);

      value = "pruebas_pld@yopmail.com";
      aesK = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA45SIe9RDkgr7vCGPF4dY\nFrF8vZdJv44Puh7AXjaj2OQXUcm8eOFrar0w1rrEZMRB+pO1+QKGubERSgunw5YD\nYPOyG5t8tZepawxnQIXSQU7oEsqzTFShSjs5K6HoLafwwDxi6KD0pGWbOH8NvX3Q\nfjn4P8pHpiAn4ZOflbzG2BeJmzvlwrZRDHqGK/IXiDEsJn1AOob9QIkdTHfHgmU1\n95DjMXxfl4ZQDIV51qaIRHoWa2mXgxiO1GVD+t7/tNOmsQy2rJ3BaZi4p/eDkfX9\ndU1wsQTWn9ZHzmiIZaKu3vdFLg1wwVLlSsKxUuGLSLad2QE4wYtsBBD/OmhdNQi9\njQIDAQAB";
      const enc = await this.cryptoService.encryptRSA(value, aesK);
      console.log(enc);
    });
  }

}
