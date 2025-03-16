import * as three from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { randFloat } from 'three/src/math/MathUtils.js';
import  spline from './spline.js';
import { Wireframe } from 'three/examples/jsm/Addons.js';
import { time } from 'three/tsl';

const	width = window.innerWidth;
const	height = window.innerHeight;

const	scene = new three.Scene();
const	camera = new three.PerspectiveCamera(60, width / height, 0.1, 500);
const	renderer = new three.WebGLRenderer();

const	cube_button = document.querySelector('#cube');
const	line_button = document.querySelector('#line');

// Light
const	ambientLight= new three.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const	point = new three.PointLight(0x00ffff, 1000);
point.position.set(-5, 10, 10);
const	pointHelper = new three.PointLightHelper(point, 1);
scene.add(point);
// Light

renderer.setSize(width, height);

document.body.appendChild(renderer.domElement);
camera.position.set(0, 3, 10);
camera.lookAt(new three.Vector3(0, -0.1, -1));

const	controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

cube_button.addEventListener('click', render_cube);
line_button.addEventListener('click', render_line);

function render_cube()
{
	const	geometry = new three.BoxGeometry(1, 1, 1, 15, 15, 15);
	const	material = new three.MeshStandardMaterial({color:0xef5500});
	const	cube = new three.Mesh(geometry, material);
	cube.translateOnAxis(new three.Vector3(1, 0, 0), 3);
	scene.add(cube);
	scene.add(point);

	renderer.setAnimationLoop(() => {
		renderer.render(scene, camera);
		controls.update();
	});
}

function render_line()
{
	const material = new three.LineBasicMaterial({color:0xf055e4});
	const lines = [];
	lines.push(new three.Vector3(0, 0, 0));
	lines.push(new three.Vector3(3, 0, 0));
	const geometry = new three.BufferGeometry().setFromPoints(lines);
	const true_line = new three.Line(geometry, material)
	scene.add(true_line);

	renderer.setAnimationLoop(() => {
		renderer.render(scene, camera);
	});
}

function render_sphere()
{
	const	sphereGeometry = new three.SphereGeometry();
	const	material = new three.MeshStandardMaterial({color: 0xefef10});
	const	mesh = new three.Mesh(sphereGeometry, material);
	mesh.translateY(3);
	scene.add(mesh);
	scene.add(pointHelper);

	renderer.setAnimationLoop(() => {
		renderer.render(scene, camera);
		controls.update();
	})
}

function	render_plane()
{
	const	geometry = new three.PlaneGeometry(20, 20, 10, 10);
	const	material = new three.MeshStandardMaterial({color: 0xffffff, side:three.DoubleSide});
	const	plane = new three.Mesh(geometry, material);
	plane.rotateX(-Math.PI / 2);
	scene.add(plane);

	renderer.setAnimationLoop(() => {
		renderer.render(scene, camera);
		controls.update()});
}

const curve = spline;
const geometry = new three.TubeGeometry(spline, 128, 1, 100, true);
const	material = new three.MeshStandardMaterial(
	{
		color:0xffffff,
		side: three.DoubleSide,
		wireframe: true,
	}
);
const curveObject = new three.Mesh(geometry, material);
scene.add(curveObject);

let t = 0;
function updateCamera()
{
	const val = (t / 2000) % 1;
	const viewDirection = curve.getPointAt((val + 0.030) % 1);
	const pos = curve.getPoint(val);
	camera.lookAt(viewDirection);
	camera.position.copy(pos);
	t++;
}

function animate()
{
	requestAnimationFrame(animate);
	updateCamera();
	renderer.setAnimationLoop(() => {
		renderer.render(scene, camera);
		controls.update()});
}

animate();