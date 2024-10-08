import { from } from 'rxjs';
import styles from './Input.module.css';
import React from 'react';

export type InputAttributeProps = {
    /** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input */
    type?:
        | 'hidden'
        | 'radio'
        | 'checkbox'
        | 'text'
        | 'search'
        | 'textarea'
        | 'date'
        | 'datetime-local'
        | 'button'
        | 'color'
        | 'email'
        | 'file'
        | 'image'
        | 'month'
        | 'number'
        | 'password'
        | 'range'
        | 'reset'
        | 'search'
        | 'sumbit'
        | 'tel'
        | 'time'
        | 'url'
        | 'week';
    placeholder?: string;
    /** @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete */
    autocomplete?:
        | 'off'
        | 'on'
        /** name 또는 name 내의 광범위한 인간 이름과 이름 구조 다루기 -> */
        | 'name'
        | 'honorific-prefix'
        | 'given-name'
        | 'additional-name'
        | 'family-name'
        | 'honorific-suffix'
        | 'nickname'
        | 'email'
        | 'username'
        | 'new-password'
        | 'current-password'
        | 'one-time-code'
        | 'organization-title'
        | 'organization'
        | 'street-address'
        | 'shipping'
        | 'billing'
        /** streat-address 가 없는 경우에만 존재 가능 */
        | 'address-line1'
        | 'address-line2'
        | 'address-line3'
        | 'address-level4'
        | 'address-level3'
        | 'address-level2'
        | 'address-level1'
        | 'country'
        | 'country-name'
        | 'postal-code'
        /** 신용 카드 관련 */
        | 'cc-name'
        | 'cc-given-name'
        | 'cc-additional-name'
        | 'cc-family-name'
        | 'cc-number'
        | 'cc-exp'
        | 'cc-exp-month'
        | 'cc-exp-year'
        | 'cc-csc'
        | 'cc-type'
        /** 통화(화폐) 관련 */
        | 'transaction-currency'
        | 'transaction-amount'
        | 'language'
        | 'bday'
        | 'bday-day'
        | 'bday-month'
        | 'bday-year'
        | 'sex'
        /** 국가 코드 && 전화 관련 */
        | 'tel'
        | 'tel-country-code'
        | 'tel-national'
        | 'tel-area-code'
        | 'tel-local'
        | 'tel-extension'
        | 'impp'
        | 'url'
        | 'photo'
        | 'webauthn'
        | '';
    id?: string;
    name?: string;
    data?: { [key: string]: string };
    event?: Partial<GlobalEventHandlers>;
    hidden?: boolean;
    lineColor?:
        | 'pale-red'
        | 'bright-purple'
        | 'bright-grey'
        | 'translucent-grey';
    stylyType?: 'standard';
    size?: 'initial' | 'inherit' | 'long' | 'short' | 'middle';
    textContent?: string;
};

export const Input = ({
    type = 'text',
    autocomplete = 'on',
    placeholder = '',
    id,
    name,
    data = {},
    hidden = false,
    lineColor,
    size = 'inherit',
    textContent,
}: InputAttributeProps) => {
    return (
        <>
            <input
                className={`${styles.input} ${(lineColor && styles[lineColor]) || styles['color-none']} ${styles[size]}`}
                type={type}
                placeholder={placeholder}
                autoComplete={autocomplete}
                id={id || ''}
                name={name || ''}
                hidden={hidden}
                {...Object.entries(data).map(([k, v]) => ({
                    [`data-${k}`]: v,
                }))}
            ></input>
            {id && <label htmlFor={id}>{textContent}</label>}
        </>
    );
};
