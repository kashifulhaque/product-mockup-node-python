const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require("os")
async function addBorder(params) {
  const { artwork, out } = params;
  await execShellCommand(`convert ${artwork} -bordercolor transparent -border 1 ${out}`);
}

async function perspectiveTransform(params) {
  const { template, artwork, out } = params;
  const coordinates = [0,0,100,0,0,3000,100,4000,1500,3000,1700,4000,1500,0,1700,0].join(',');
  // const transform = `sh perspective_transform.sh ${template} ${artwork} ${coordinates} ${out}`;
  const transform = `convert ${template} -alpha transparent \( ${artwork} +distort perspective ${coordinates} \) -background transparent -layers merge +repage ${out}`
  await execShellCommand(transform);
}

async function setBackgroundColor(params) {
  const { artwork, color = 'transparent', out } = params;
  const setBackground = `convert ${artwork} -background "${color}" -alpha remove ${out}`;
  await execShellCommand(setBackground);
}

async function addDisplacement(params) {
  const { artwork, displacementMap, out, dx = 20, dy = 20 } = params;
  const displace = `convert ${artwork} ${displacementMap} -compose displace -set option:compose:args ${dx}x${dy} -composite ${out}`;
  await execShellCommand(displace);
}

async function addHighlights(params) {
  const { artwork, lightingMap, out, mode = 'hardlight' } = params;
  const highlight = `convert ${artwork} \( -clone 0 ${lightingMap} -compose ${mode} -composite \) +swap -compose CopyOpacity -composite ${out}`;
  await execShellCommand(highlight);
}

async function adjustColors(params) {
  const { artwork, adjustmentMap, out } = params;
  const adjust = `convert ${artwork} \( -clone 0 ${adjustmentMap} -compose multiply -composite \) +swap -compose CopyOpacity -composite ${out}`;
  await execShellCommand(adjust);
}

async function composeArtwork(params) {
  const { template, artwork, mask, out, mode = 'over' } = params;
  const compose = `convert ${template} ${artwork} ${mask} -compose ${mode} -composite ${out}`;
  await execShellCommand(compose);
}

async function generateMockup(params) {
  const { artwork, template, displacementMap, lightingMap, adjustmentMap, mask, out } = params;
  const tmp = path.join(os.tmpdir(), `${Math.random().toString(36).substring(7)}.mpc`);
  await addBorder({ artwork, out: tmp });
  await perspectiveTransform({ template, artwork: tmp, out: tmp });
  // await setBackgroundColor({ artwork: tmp, color: 'black', out: tmp });
  await addDisplacement({ artwork: tmp, displacementMap, out: tmp });
  await addHighlights({ artwork: tmp, lightingMap, out: tmp });
  await adjustColors({ artwork: tmp, adjustmentMap, out: tmp });
  await composeArtwork({ template, artwork: tmp, mask, out });
  fs.unlinkSync(tmp);
}

function execShellCommand(command) {
  return new Promise((resolve, reject) => {
    try {
      execSync(command);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

mockups = {
  'out': "final_js2.jpg",
  'artwork': "art24.png",
  'template': 'template.png',
  'mask': 'mask.png',
  'displacementMap': 'displacement.png',
  'lightingMap': 'lighting.png',
  'adjustmentMap': 'adjust.png'}

generateMockup(mockups)