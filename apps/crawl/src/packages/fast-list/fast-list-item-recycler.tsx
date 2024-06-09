import lodash from 'lodash';

export const FastListItemTypes = {
    SPACER: 0,
    HEADER: 1,
    FOOTER: 2,
    SECTION: 3,
    ROW: 4,
    SECTION_FOOTER: 5,
} as const;

type FastListItemType = (typeof FastListItemTypes)[keyof typeof FastListItemTypes];

export type FastListItem = {
    type: FastListItemType;
    key: number;
    layoutY: number;
    layoutHeight: number;
    section: number;
    row: number;
};

let _LAST_KEY: number = 0;

type InnerItem = {
    [x in FastListItemType]: {
        [x: string]: FastListItem;
    };
};

type InnerPendingItems = {
    [x in FastListItemType]: FastListItem[];
};

export function fastListItemRecycler(items: FastListItem[]) {
    let _items: InnerItem = {
        '0': {},
        '1': {},
        '2': {},
        '3': {},
        '4': {},
        '5': {},
    };
    let _pendingItems: InnerPendingItems = {
        '0': [],
        '1': [],
        '2': [],
        '3': [],
        '4': [],
        '5': [],
    };

    const _itemsForType = (type: FastListItemType): [{ [x: string]: FastListItem }, FastListItem[]] => {
        return [_items[type] || (_items[type] = {}), _pendingItems[type] || (_pendingItems[type] = [])];
    };

    items.forEach((item) => {
        const { type, section, row } = item;
        const [innerItems] = _itemsForType(type);
        innerItems[`${type}:${section}:${row}`] = item;
    });

    const _get = (
        type: FastListItemType,
        layoutY: number,
        layoutHeight: number,
        section: number,
        row: number,
        innerItems: { [x: string]: FastListItem },
        pendingItems: FastListItem[],
    ) => {
        const itemKey = `${type}:${section}:${row}`;
        let item = innerItems[itemKey];
        if (item == null) {
            item = { type, key: -1, layoutY, layoutHeight, section, row };
            pendingItems.push(item);
        } else {
            item.layoutY = layoutY;
            item.layoutHeight = layoutHeight;
            delete innerItems[itemKey];
        }
        return item;
    };

    const get = (type: FastListItemType, layoutY: number, layoutHeight: number, section: number = 0, row: number = 0) => {
        const [innerItems, pendingItems] = _itemsForType(type);
        return _get(type, layoutY, layoutHeight, section, row, innerItems, pendingItems);
    };

    const _fill = (innerItems: { [x: string]: FastListItem }, pendingItems: FastListItem[]) => {
        let index = 0;

        lodash.forEach(innerItems, ({ key }) => {
            const item = pendingItems[index];
            if (item == null) {
                return false;
            }

            item.key = key;
            index++;

            return true;
        });

        for (; index < pendingItems.length; index++) {
            pendingItems[index].key = ++_LAST_KEY;
        }

        pendingItems.length = 0;
    };

    const fill = () => {
        lodash.forEach(FastListItemTypes, (type) => {
            const [innerItems, pendingItems] = _itemsForType(type);
            _fill(innerItems, pendingItems);
        });
    };

    return {
        get,
        fill,
    };
}
