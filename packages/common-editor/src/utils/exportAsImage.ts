import { Canvg, presets } from 'canvg';
async function toPng(data: {
    width: number,
    height: number,
    svg: string
}) {
    const {
        width,
        height,
        svg
    } = data
    const preset = presets.offscreen()
    const canvas = new OffscreenCanvas(width, height)
    const ctx = canvas.getContext('2d')
    const v = await Canvg.from(ctx!, svg, preset)
    await v.render()
    const blob = await canvas.convertToBlob()
    const pngUrl = URL.createObjectURL(blob)
    return pngUrl
}

export default async function exportAsImage(svgId: string, imageName: string = 'pic_name.jpg') {
    const svg = document.getElementById(svgId) as HTMLElement;
    let img = document.createElement('a');
    await new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const url = await toPng({
                    width: 600,
                    height: 1000,
                    svg: svg.innerHTML
                })
                img.href = url.replace("image/jpeg", "image/octet-stream");
                img.download = imageName;
                img.click();
                resolve("")
            } catch (e) {
                reject(e)
            }
        }, 0)
    })
}

export async function exportAsBase64(svgId: string): Promise<string> {
    const svg = document.getElementById(svgId) as HTMLElement;
    const preset = presets.offscreen()
    const canvas = new OffscreenCanvas(600, 10000);
    const ctx = canvas.getContext('2d')
    const v = await Canvg.from(ctx!, svg.innerHTML, preset)
    await v.render()
    const blob = await canvas.convertToBlob()
    const file = new File([blob], 'screenshot.png', { type: 'image/jpeg' });
    var reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
        reader.onload = function () {
            resolve(reader.result as string)
        }
    })
}
