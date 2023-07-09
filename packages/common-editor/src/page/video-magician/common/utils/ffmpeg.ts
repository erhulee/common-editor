import { fetchFile, createFFmpeg } from '@ffmpeg/ffmpeg'
export class FFmpegController {
    private _ffmpeg: ReturnType<typeof createFFmpeg>
    constructor() {
        const ffmpeg = createFFmpeg({
            corePath: '/plugin/ffmpeg-core.js',
            log: true
        })
        this._ffmpeg = ffmpeg
        ffmpeg.load()
        ffmpeg.setProgress(progress => {
            console.log('🚀 ~ file: useFfmpeg.ts:16 ~ progress.ratio:', progress.ratio)
        })
    }

    async importVideo(video: Blob) {
        this._ffmpeg.FS("writeFile", "initVideo", await fetchFile(video));
        await this._ffmpeg.run("-i", "initVideo")
    }
}