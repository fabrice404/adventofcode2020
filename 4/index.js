const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8');

const passports = input.split(/\n\n/gi);

// part 1
console.log(
  passports.map(passport => {
    return !!(
      passport.match('byr:') &&
      passport.match('iyr:') &&
      passport.match('eyr:') &&
      passport.match('hgt:') &&
      passport.match('hcl:') &&
      passport.match('ecl:') &&
      passport.match('pid:')
    );
  }).filter(x => x).length
);


// part 2
console.log(
  passports.map(passport => {
    // I'm way too lazy to write regex, doing it the dumb way 

    let byr = false;
    let iyr = false;
    let eyr = false;
    let hgt = false;
    let hcl = false;
    let ecl = false;
    let pid = false;
    passport.replace(/\n/gi, ' ').split(' ')
      .forEach(attr => {
        let [key, val] = attr.split(':');
        switch (key) {
          case 'byr':
            byr = parseInt(val, 10) >= 1920 && parseInt(val, 10) <= 2002;
            break;
          case 'iyr':
            iyr = parseInt(val, 10) >= 2010 && parseInt(val, 10) <= 2020;
            break;
          case 'eyr':
            eyr = parseInt(val, 10) >= 2020 && parseInt(val, 10) <= 2030;
            break;
          case 'hgt':
            const valNumeric = parseInt(val.replace(/[^0-9]/gi, ''), 10)
            if (val.match(/cm$/g)) {
              hgt = valNumeric >= 150 && valNumeric <= 193;
            } else if (val.match(/in$/g)) {
              hgt = valNumeric >= 59 && valNumeric <= 76;
            }
            break;
          case 'hcl':
            hcl = !!val.match(/^#[a-fA-F0-9]{6}$/);
            break;
          case 'ecl':
            ecl = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(val);
            break;
          case 'pid':
            pid = !!val.match(/^[0-9]{9}$/);
            break;
        }
      });

    return !!(
      byr &&
      iyr &&
      eyr &&
      hgt &&
      hcl &&
      ecl &&
      pid
    );
  }).filter(x => x).length
);