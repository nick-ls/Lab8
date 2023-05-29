// unit.test.js

const { isPhoneNumber, isEmail, isStrongPassword, isDate, isHexColor } = require('../code-to-unit-test/unit-test-me.js');

test("Matches an invalid phone number", () => {
	expect(isPhoneNumber("32823dsjflwkjf")).toBe(false);
});
test("Matches a invalid phone number", () => {
	expect(isPhoneNumber("123 456 6896")).toBe(false);
});
test("Matches a valid phone number", () => {
	expect(isPhoneNumber("asfasdf192-2345sskdjflksdjf")).toBe(true);
});
test("Matches a valid phone number", () => {
	expect(isPhoneNumber("(444) 339-4444")).toBe(true);
});

test("Matches an invalid email", () => {
	expect(isEmail("abc+test@gmail.com")).toBe(false);
});
test("Matches an invalid email", () => {
	expect(isEmail("john@domain.online")).toBe(false);
});
test("Matches a valid email", () => {
	expect(isEmail("jDLFKJoijdfoiJOSDIFJ38487583949IDUFHIU@________.AAA")).toBe(true);
});
test("Matches a valid email", () => {
	expect(isEmail("sldkfjLkjdflskdjflsji338849@ldkfjslkdf.sdf")).toBe(true);
});


test("Matches a \"weak\" password", () => {
	expect(isStrongPassword("7596177c536445ccb1c39645e724e958cd337a310be2b3e00ed1ec15ca7d75e70784f29d7fed62dff1d4247872efed401d4a1210300b0d549ba8a1c5b6c8cde6")).toBe(false);
});
test("Matches a \"weak\" password", () => {
	expect(isStrongPassword("5Correct Horse Battery Staple")).toBe(false);
});
test("Matches a \"strong\" password", () => {
	expect(isStrongPassword("Password123")).toBe(true);
});
test("Matches a \"strong\" password", () => {
	expect(isStrongPassword("fart")).toBe(true);
});

test("Matches an invalid date", () => {
	expect(isDate("03/04/23")).toBe(false);
});
test("Matches an invalid date", () => {
	expect(isDate("9/02/20223")).toBe(false);
});
test("Matches a valid date", () => {
	expect(isDate("99/88/7777")).toBe(true);
});
test("Matches a valid date", () => {
	expect(isDate("9/02/2023")).toBe(true);
});

test("Matches an invalid hex color", () => {
	expect(isHexColor("aaba2")).toBe(false);
});
test("Matches an invalid hex color", () => {
	expect(isHexColor("1029384")).toBe(false);
});
test("Matches a valid hex color", () => {
	expect(isHexColor("#aabaaa")).toBe(true);
});
test("Matches a valid hex color", () => {
	expect(isHexColor("123")).toBe(true);
});