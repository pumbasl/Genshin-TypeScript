import React from 'react';
import { Badge } from 'react-bootstrap';

// Locales
import { useTranslation } from 'react-i18next';
//

export default function EmptyContainer(){
    const { t } = useTranslation();

    return(
        <div className="mb-2">
            <Badge bg='purple'>{t('Пусто.')}</Badge>
        </div>
    );
}