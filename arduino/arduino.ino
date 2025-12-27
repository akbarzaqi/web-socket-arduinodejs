// LED blink setiap 1 detik

#define LED_PIN 13

void setup() {
  Serial.begin(9600);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {

  if(Serial.available() > 0) {
    char data = Serial.read();
    if(!data) Serial.end();

    if(data == '1') {
      digitalWrite(LED_PIN, HIGH); // LED ON
      delay(1000);  
    } 

    if(data == '2') {
      digitalWrite(LED_PIN, LOW);  // LED OFF
      delay(1000); 
    }
  }
}
