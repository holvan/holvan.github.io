'use client';

import { motion } from 'framer-motion';

export interface NewsItem {
    date: string;
    content: string;
}

interface NewsProps {
    items: NewsItem[];
    title?: string;
    /** Approximate number of items to show before the list becomes scrollable. */
    limit?: number;
}

export default function News({ items, title = 'News', limit }: NewsProps) {
    const isScrollable = typeof limit === 'number' && limit > 0 && items.length > limit;

    // Snap the panel to a whole number of rows so nothing is ever cut mid-line.
    // Each row is 1.25rem tall with a 0.75rem gap between rows; box-sizing is
    // border-box, so the 0.75rem bottom padding and 1px border are added here too.
    const maxHeight = isScrollable
        ? `${limit * 1.25 + (limit - 1) * 0.75 + 0.75 + 0.125}rem`
        : undefined;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{title}</h2>
            <div>
                <div
                    className={
                        isScrollable
                            ? 'space-y-3 overflow-y-auto pr-3 border-b border-neutral-200 dark:border-neutral-800 pb-3'
                            : 'space-y-3'
                    }
                    style={maxHeight ? { maxHeight, scrollbarGutter: 'stable' } : undefined}
                >
                    {items.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                            <span className="text-xs text-neutral-500 mt-1 w-16 flex-shrink-0">{item.date}</span>
                            <p className="text-sm text-neutral-700">{item.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
