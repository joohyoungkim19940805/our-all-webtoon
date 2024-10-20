import { Input } from '@component/Input';

export const WebtoonSearchInput = () => {
    return (
        <Input
            type="search"
            autocomplete="on"
            placeholder="웹툰을 검색해보세요."
            size="long"
        ></Input>
    );
};
