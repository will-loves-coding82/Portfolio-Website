let radius;
let globe;
let vertices = [];


class Vertex {
  constructor(x, y, z, radius) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.rad_start = random(0, 0.5) * 1.3;
    this.radius = radius;
    this.color = color(random(255), random( 255), random(255))
    this.wave_form = int(random(0, 2));
  }

  link() {
    for (let long = 0; long < vertices.length; long++) {
      for (let lat = 0; lat < vertices[long].length; lat++) {
        let distance = dist(
          vertices[long][lat].x,
          vertices[long][lat].y,
          vertices[long][lat].z,
          this.x,
          this.y,
          this.z
        );
        stroke(255, 255, 255, 10)
        strokeWeight(3);
        if (distance <= (PI/4) * radius) {
          beginShape();
          vertex(
            vertices[long][lat].x,
            vertices[long][lat].y,
            vertices[long][lat].z
          );
          vertex(this.x, this.y, this.z);
          endShape();
        }
      }
    }
  }
}

class Sphere {
  constructor() {
    vertices = [];

    for (let i = 0; i < 20; i ++) {
      let lat_row = [];

      for (let j = 0; j < 20; j ++) {
        let long = random(0, PI);
        let lat = random(0, 2 * PI);

        let x = radius * cos(long) * sin(lat);
        let y = radius * sin(long) * sin(lat);
        let z = radius * cos(lat);

        let v = new Vertex(x, y, z, radius);

        lat_row.push(v);
      }
      vertices.push(lat_row);
    }
    console.log(
      "vertices array has " + vertices.length * vertices[0].length + " points"
    );
  }

  animate() {
    smooth();
    beginShape(POINTS);

    for (let long = 0; long < vertices.length; long++) {
      for (let lat = 0; lat < vertices[long].length; lat++) {
        let v = vertices[long][lat];
        let rad_change;
        let wave = v.wave_form;
        if (wave == 0) {
          rad_change = radius + 10 * v.rad_start * cos(millis() / 1000);
        } else {
          rad_change = radius + 10 * v.rad_start * sin(millis() / 1000);
        }

        let x = rad_change * cos(v.x) * sin(v.y);
        let y = rad_change * sin(v.x) * sin(v.y);
        let z = rad_change * cos(v.y);

        stroke(v.color)
        strokeWeight(8);
        //v.link()
        vertex(x, y, z);
        

      }
    }
    endShape();
  }
}

function draw() {
  background(0);
  let angle = ((millis() / 10000) * PI) / 2;

  if (angle == 2 * PI) {
    angle = ((millis() / 10000) * -PI) / 2;
  }
  rotateX(angle);
  rotateY(angle);

  globe.animate();
}


function setup() {
    console.log('setting up')
    let container = document.getElementById('myCanvas');
    let canvas = createCanvas(container.offsetWidth, container.offsetHeight, WEBGL);
    radius = container.offsetHeight / 3;

    canvas.parent("myCanvas")
    globe = new Sphere();
  }


function windowResized() {
    // Adjust canvas size when the window is resized
    let container = document.getElementById('myCanvas');
    resizeCanvas(container.offsetWidth, container.offsetHeight);
}