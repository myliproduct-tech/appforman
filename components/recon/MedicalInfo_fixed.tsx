// Temporary file to check structure - will copy correct ending
                                </div >
                            </div >
                        </div >
                    </div >
                </div >
            )}

{/* Date Picker Modal */ }
<DatePickerModal
    isOpen={showDatePicker}
    onClose={() => setShowDatePicker(false)}
    onSelect={(date) => {
        setNewCheckupDate(date);
        setShowDatePicker(false);
    }}
    initialDate={newCheckupDate}
    title="Datum kontroly"
/>
        </>
    );
};
