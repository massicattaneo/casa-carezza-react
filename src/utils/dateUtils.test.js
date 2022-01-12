import { getFirstSaturday, getFormattedWeek } from './dateUtils';

describe('#getFirstSaturday', () => {
    it('2021 => 02 january', () => {
        expect(getFirstSaturday(2021)).toEqual(new Date('2021-01-02'));
    });
    it('2022 => 01 january', () => {
        expect(getFirstSaturday(2022)).toEqual(new Date('2022-01-01'));
    });
    it('2023 => 07 january', () => {
        expect(getFirstSaturday(2023)).toEqual(new Date('2023-01-07'));
    });
});

describe('#getFormattedWeek', () => {
    it('should get back the formatted week string', () => {
        expect(getFormattedWeek(2021, 1))
            .toEqual('Da Sabato 2 gennaio a Sabato 9 gennaio');
        expect(getFormattedWeek(2021, 11))
            .toEqual('Da Sabato 13 marzo a Sabato 20 marzo');
    });
});
