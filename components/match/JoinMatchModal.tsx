{players.map((player) => {
  const isSelected = selectedPlayerId === player.id;

  return (
    <div
      key={player.id}
      onClick={() => setSelectedPlayerId(player.id)}
      className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border transition-all duration-200 group ${
        isSelected
          ? "bg-[#ccff00]/10 border-[#ccff00]"
          : "bg-black border-zinc-800 hover:border-zinc-600"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
            isSelected
              ? "border-[#ccff00]"
              : "border-zinc-600 group-hover:border-zinc-400"
          }`}
        >
          {isSelected && (
            <div className="w-2.5 h-2.5 rounded-full bg-[#ccff00]" />
          )}
        </div>

        <div>
          <p
            className={`font-black uppercase tracking-tight ${
              isSelected ? "text-[#ccff00]" : "text-white"
            }`}
          >
            {player.full_name}
          </p>

          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mt-0.5">
            {player.primary_position}
          </p>
        </div>
      </div>
    </div>
  );
})}