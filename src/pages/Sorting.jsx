{notification && (
    <motion.div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25, duration: 0.5 }}>
        {notification}
    </motion.div>
)}
