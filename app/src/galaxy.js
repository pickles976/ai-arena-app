import * as THREE from 'three'
import seedrandom from "seedrandom";


// Data and visualization
import { Galaxy3D, Universe, CompositionShader } from 'ai-arena-map';
import { BASE_LAYER, BLOOM_LAYER, BLOOM_PARAMS, OVERLAY_LAYER } from "ai-arena-map";
import { GalaxyData, UserData, GALAXY_PARAMS } from 'ai-arena-map-headless'

// Rendering
import { MapControls } from 'three/addons/controls/OrbitControls.js'

import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

export let galaxy, galaxy3D
let canvas, renderer, camera, scene, orbit, baseComposer, bloomComposer, overlayComposer, skybox

let request = null

function initThree() {

    // grab canvas
    canvas = document.querySelector('#multiplayer-canvas');

    // scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xEBE2DB, 0.00003);

    // camera
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 5000000 );
    camera.position.set(0, 500, 500);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);

    // map orbit
    orbit = new MapControls(camera, canvas)
    orbit.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    orbit.dampingFactor = 0.05;
    orbit.screenSpacePanning = false;
    orbit.minDistance = 1;
    orbit.maxDistance = 16384;
    orbit.maxPolarAngle = (Math.PI / 2) - (Math.PI / 360)

    initRenderPipeline()

}

function initRenderPipeline() {

    // Assign Renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas,
        logarithmicDepthBuffer: true,
    })
    renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize( window.innerWidth, window.innerHeight )
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.5

    // General-use rendering pass for chaining
    const renderScene = new RenderPass( scene, camera )

    // Rendering pass for bloom
    const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 )
    bloomPass.threshold = BLOOM_PARAMS.bloomThreshold
    bloomPass.strength = BLOOM_PARAMS.bloomStrength
    bloomPass.radius = BLOOM_PARAMS.bloomRadius

    // bloom composer
    bloomComposer = new EffectComposer(renderer)
    bloomComposer.renderToScreen = false
    bloomComposer.addPass(renderScene)
    bloomComposer.addPass(bloomPass)

    // overlay composer
    overlayComposer = new EffectComposer(renderer)
    overlayComposer.renderToScreen = false
    overlayComposer.addPass(renderScene)

    // Shader pass to combine base layer, bloom, and overlay layers
    const finalPass = new ShaderPass(
        new THREE.ShaderMaterial( {
            uniforms: {
                baseTexture: { value: null },
                bloomTexture: { value: bloomComposer.renderTarget2.texture },
                overlayTexture: { value: overlayComposer.renderTarget2.texture }
            },
            vertexShader: CompositionShader.vertex,
            fragmentShader: CompositionShader.fragment,
            defines: {}
        } ), 'baseTexture'
    );
    finalPass.needsSwap = true;

    // base layer composer
    baseComposer = new EffectComposer( renderer )
    baseComposer.addPass( renderScene )
    baseComposer.addPass(finalPass)
}

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
}

async function render() {

    orbit.update()

    // fix buffer size
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    // fix aspect ratio
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();

    // Update galaxy scale/opacity and whatnot from zoom
    galaxy3D.updateFromZoom(camera)

    // Run each pass of the render pipeline
    renderPipeline()

    request = requestAnimationFrame(render)

}

function renderPipeline() {

    // Render bloom
    camera.layers.set(BLOOM_LAYER)
    bloomComposer.render()

    // Render overlays
    camera.layers.set(OVERLAY_LAYER)
    overlayComposer.render()

    // Render normal
    camera.layers.set(BASE_LAYER)
    baseComposer.render()

}

function initSkybox() {

    // Add Sky
    skybox = new Universe();
    skybox.layers.set(BASE_LAYER)
    skybox.scale.setScalar( 2000000 );

    scene.add( skybox );

}

export function initializeViewer(seed, numStars) {

    // console.log(seed, numStars)

    initThree()
    initSkybox()

    seedrandom(seed, { global: true });

    galaxy = new GalaxyData(numStars, GALAXY_PARAMS)
    galaxy3D = new Galaxy3D(scene, galaxy)

    request = requestAnimationFrame(render)

}

export function killGalaxy(){
    window.cancelAnimationFrame(request)
}