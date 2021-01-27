/** 킥보드 설정 정보 요청시 가져오는 인터페이스입니다.. */
export declare class PacketMT5 {
    type: 5;
    batterySN: string;
    totalTrip: number;
    totalTime: number;
    totalCapacity: number;
    cellType: string;
    cells: number[];
}
export interface OriginalPacketMT5 {
    mt: 5;
    batsn: string /** 배터리 시리얼 넘버 */;
    totrip: number /** 총 주행 거리 */;
    totime: number /** 총 주행 시간 */;
    tocap: number /** 총 용량 */;
    ctype: string /** 셀 타입 */;
    cell: number[] /** 셀 볼트수 */;
}
export default function (original: OriginalPacketMT5): PacketMT5;
