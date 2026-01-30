import React, { useState } from 'react';

const IconBattery = () => (
  <div style={{ width: '24px', height: '24px', position: 'relative' }}>
    <div style={{
      position: 'absolute',
      top: '6px',
      left: '0',
      width: '18px',
      height: '10px',
      border: '2px solid var(--lcd-ink)'
    }}></div>
    <div style={{
      position: 'absolute',
      top: '8px',
      left: '18px',
      width: '2px',
      height: '6px',
      background: 'var(--lcd-ink)'
    }}></div>
  </div>
);

const IconSat = () => (
  <div style={{
    width: '20px',
    height: '20px',
    border: '2px solid var(--lcd-ink)',
    transform: 'rotate(45deg)',
    display: 'inline-block',
    position: 'relative'
  }}>
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '-10px',
      right: '-10px',
      height: '2px',
      background: 'var(--lcd-ink)'
    }}></div>
  </div>
);

const BarContainer = ({ segments, filled }) => (
  <div style={{
    height: '16px',
    border: '2px solid var(--lcd-ink)',
    borderRadius: '4px',
    width: '100%',
    padding: '2px',
    display: 'flex',
    gap: '2px'
  }}>
    {Array.from({ length: segments }).map((_, i) => (
      <div
        key={i}
        style={{
          flex: 1,
          background: i < filled ? 'var(--lcd-ink)' : 'transparent',
          borderRight: i < segments - 1 ? '1px solid var(--lcd-dim)' : 'none'
        }}
      ></div>
    ))}
  </div>
);

const StatGroup = ({ label, segments, filled }) => (
  <div style={{ marginBottom: 'var(--space-m)' }}>
    <span style={{
      fontFamily: "'Press Start 2P', cursive",
      fontSize: '10px',
      marginBottom: 'var(--space-xs)',
      display: 'block'
    }}>{label}</span>
    <BarContainer segments={segments} filled={filled} />
  </div>
);

const ListRow = ({ label, value, action }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'var(--space-s) 0',
    borderBottom: '2px dashed var(--lcd-dim)'
  }}>
    <span style={{ fontSize: '20px', lineHeight: '1.2' }}>{label}</span>
    {action ? action : <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{value}</span>}
  </div>
);

const Button = ({ children, onClick, primary, style }) => (
  <button
    onClick={onClick}
    style={{
      background: primary ? 'var(--lcd-ink)' : 'transparent',
      border: 'var(--border-width) solid var(--lcd-ink)',
      color: primary ? 'var(--lcd-bg)' : 'var(--lcd-ink)',
      fontFamily: "'Press Start 2P', cursive",
      fontSize: '10px',
      padding: '12px var(--space-m)',
      cursor: 'pointer',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      borderRadius: '8px',
      transition: 'all 0.1s',
      ...style
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = primary ? '2px 2px 0px rgba(0,0,0,0.2)' : '2px 2px 0px var(--lcd-ink)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    onMouseDown={(e) => {
      e.currentTarget.style.transform = 'translateY(0px)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    {children}
  </button>
);

const Panel = ({ children, header, title, subtitle, footer = true }) => (
  <div style={{
    border: 'var(--border-width) solid var(--lcd-ink)',
    borderRadius: 'var(--border-radius)',
    position: 'relative',
    background: 'var(--lcd-bg)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  }}>
    {header && (
      <div style={{
        padding: 'var(--space-s) var(--space-m)',
        borderBottom: 'var(--border-width) solid var(--lcd-ink)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ fontFamily: "'Press Start 2P', cursive", textTransform: 'uppercase', lineHeight: '1.4', fontSize: '14px', margin: '0 0 var(--space-s) 0' }}>{title}</h2>
        {subtitle && <h3 style={{ fontFamily: "'Press Start 2P', cursive", textTransform: 'uppercase', lineHeight: '1.4', fontSize: '10px', margin: '0' }}>{subtitle}</h3>}
      </div>
    )}
    {children}
    {footer && (
      <div style={{
        height: '12px',
        width: '100%',
        borderTop: 'var(--border-width) solid var(--lcd-ink)',
        backgroundImage: 'linear-gradient(45deg, var(--lcd-ink) 25%, transparent 25%), linear-gradient(-45deg, var(--lcd-ink) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--lcd-ink) 75%), linear-gradient(-45deg, transparent 75%, var(--lcd-ink) 75%)',
        backgroundSize: '6px 6px',
        backgroundPosition: '0 0, 0 3px, 3px -3px, -3px 0px',
        marginTop: 'auto'
      }}></div>
    )}
  </div>
);

const PanelBody = ({ children }) => (
  <div style={{
    padding: 'var(--space-m)',
    flex: 1,
    overflowY: 'auto'
  }}>
    {children}
  </div>
);

const App = () => {
  const [health, setHealth] = useState(5);
  const [luminescence, setLuminescence] = useState(3);
  const [hunger, setHunger] = useState(1);
  const [lightMode, setLightMode] = useState('AUTO');
  const [flowMode, setFlowMode] = useState('HIGH');
  const [o2Mode, setO2Mode] = useState('NRML');
  const [activeModal, setActiveModal] = useState(null);
  const [alerts, setAlerts] = useState(['SYSTEM REBOOTED', 'PH LEVEL STABLE', 'GROWTH DETECTED']);
  const [visualEffect, setVisualEffect] = useState(null);
  const [inventory, setInventory] = useState({
    food: 5,
    meds: 2
  });

  // Game States
  const [gameActive, setGameActive] = useState(false);
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 50 });
  const [gameItems, setGameItems] = useState([]);
  const [gameScore, setGameScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [isDead, setIsDead] = useState(false);

  const [birthDate] = useState(new Date(Date.now() - (4 * 24 * 60 * 60 * 1000) - (12 * 60 * 60 * 1000)));
  const [now, setNow] = useState(Date.now());
  const [weight, setWeight] = useState(4.2);

  React.useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const movePlayer = (direction) => {
    const step = 8;
    setPlayerPos(prev => {
      let newPos = { ...prev };
      if (direction === 'up') newPos.y = Math.max(10, prev.y - step);
      if (direction === 'down') newPos.y = Math.min(90, prev.y + step);
      if (direction === 'left') newPos.x = Math.max(10, prev.x - step);
      if (direction === 'right') newPos.x = Math.min(90, prev.x + step);
      return newPos;
    });
  };

  // Keyboard Movement
  React.useEffect(() => {
    if (!gameActive) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') movePlayer('up');
      if (e.key === 'ArrowDown') movePlayer('down');
      if (e.key === 'ArrowLeft') movePlayer('left');
      if (e.key === 'ArrowRight') movePlayer('right');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameActive]);

  // Game Loop: Spawn and Collect Items
  React.useEffect(() => {
    if (!gameActive) {
      setGameItems([]);
      setGameTime(0);
      return;
    }

    // Game timer
    const timerInterval = setInterval(() => {
      setGameTime(t => t + 1);
    }, 1000);

    // Spawn items VERY frequently
    const spawnInterval = setInterval(() => {
      setGameItems(prev => {
        if (prev.length < 20) {
          const rand = Math.random();
          let itemType;
          if (rand > 0.85) itemType = 'BOMB';
          else if (rand > 0.7) itemType = 'MEDS';
          else itemType = 'FOOD';

          const newItem = {
            id: Math.random(),
            x: 15 + Math.random() * 70,
            y: 15 + Math.random() * 70,
            type: itemType,
            spawnTime: Date.now()
          };
          return [...prev, newItem];
        }
        return prev;
      });
    }, 400); // SUPER fast spawning!

    // Physics and collision detection
    const physicsInterval = setInterval(() => {
      // Gradual stat drain
      setHunger(h => {
        const newHunger = Math.min(6, h + 0.04);
        if (newHunger >= 6) {
          setIsDead(true);
          setGameActive(false);
          setAlerts(prev => [...prev, 'CRITICAL: SPECIMEN DIED FROM STARVATION']);
        }
        return newHunger;
      });

      setHealth(h => {
        const newHealth = Math.max(0, h - 0.02);
        if (newHealth <= 0) {
          setIsDead(true);
          setGameActive(false);
          setAlerts(prev => [...prev, 'CRITICAL: SPECIMEN HEALTH FAILURE']);
        }
        return newHealth;
      });

      // Check collisions
      setGameItems(prev => {
        const remaining = prev.filter(item => {
          const dist = Math.sqrt(Math.pow(item.x - playerPos.x, 2) + Math.pow(item.y - playerPos.y, 2));
          if (dist < 8) {
            // Collision detected!
            if (item.type === 'FOOD') {
              setInventory(inv => ({ ...inv, food: inv.food + 1 }));
              setHunger(h => Math.max(0, h - 0.8));
              setGameScore(s => s + 10);
              triggerEffect('FEED');
            } else if (item.type === 'MEDS') {
              setInventory(inv => ({ ...inv, meds: inv.meds + 1 }));
              setHealth(h => Math.min(6, h + 0.8));
              setGameScore(s => s + 50);
              triggerEffect('MEDS');
            } else if (item.type === 'BOMB') {
              // BOMB DAMAGE!
              setHealth(h => {
                const newHealth = Math.max(0, h - 2);
                if (newHealth <= 0) {
                  setIsDead(true);
                  setGameActive(false);
                  setAlerts(prev => [...prev, 'FATAL: SPECIMEN CONSUMED TOXIC MATERIAL']);
                }
                return newHealth;
              });
              setGameScore(s => Math.max(0, s - 100));
              setAlerts(prev => [...prev, 'WARNING: TOXIC ITEM CONSUMED! -2 HEALTH']);
              triggerEffect('BOMB');
            }
            return false;
          }
          return true;
        });
        return remaining;
      });
    }, 100);

    return () => {
      clearInterval(timerInterval);
      clearInterval(spawnInterval);
      clearInterval(physicsInterval);
    };
  }, [gameActive, playerPos]);

  const formatAge = () => {
    const diff = now - birthDate.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${days.toString().padStart(2, '0')}d:${hours.toString().padStart(2, '0')}h:${minutes.toString().padStart(2, '0')}m:${seconds.toString().padStart(2, '0')}s`;
  };

  const currentWeight = (weight + (now - birthDate.getTime()) / (1000 * 60 * 60 * 24) * 0.5).toFixed(2);

  const getDynamicDepth = () => {
    const base = 420;
    const fluctuation = Math.sin(now / 2000) * 5;
    return (base + fluctuation).toFixed(1);
  };

  const getDynamicTemp = () => {
    const base = 4.2;
    const fluctuation = Math.cos(now / 3000) * 0.2;
    return (base + fluctuation).toFixed(1);
  };

  const getDynamicPos = () => {
    const lat = 34.02 + Math.sin(now / 10000) * 0.05;
    const lon = -118.2 + Math.cos(now / 15000) * 0.05;
    return `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
  };

  const getDynamicBattery = () => {
    const base = 98;
    // Simulate very slow drain, resets on "Reset"
    const drain = ((now - birthDate.getTime()) / (1000 * 60 * 60)) % 100;
    return Math.max(0, Math.floor(base - drain));
  };


  const triggerEffect = (name) => {
    setVisualEffect(name);
    setTimeout(() => setVisualEffect(null), 1000);
  };

  const handleFeed = () => {
    if (hunger > 0 && inventory.food > 0) {
      setHunger(Math.max(0, hunger - 1));
      setHealth(Math.min(6, health + 1));
      setWeight(w => w + 0.05);
      setInventory(prev => ({ ...prev, food: prev.food - 1 }));
      setAlerts([...alerts, 'FEEDING COMPLETE (-1 FOOD)']);
      triggerEffect('FEED');
    } else if (inventory.food === 0) {
      setAlerts([...alerts, 'ERR: OUT OF NUTRIENTS!']);
    }
  };

  const handlePlay = () => {
    if (isDead) {
      // Revive specimen
      setIsDead(false);
      setHealth(5);
      setHunger(1);
      setAlerts(prev => [...prev, 'SYSTEM REBOOT: SPECIMEN REVIVED']);
      return;
    }

    if (!gameActive) {
      setGameActive(true);
      setGameScore(0);
      setGameTime(0);
      setPlayerPos({ x: 50, y: 50 });
      setAlerts([...alerts, 'MANUAL OVERRIDE: SPECIMEN CONTROL ACTIVE']);
    } else {
      setGameActive(false);
      setAlerts([...alerts, `SESSION ENDED. SCORE: ${gameScore} | TIME: ${gameTime}s`]);
    }
  };

  const handleClean = () => {
    setHealth(Math.min(6, health + 1));
    setAlerts([...alerts, 'HABITAT CLEANED']);
    triggerEffect('CLEAN');
  };

  const handleMeds = () => {
    if (inventory.meds > 0) {
      setHealth(6);
      setInventory(prev => ({ ...prev, meds: prev.meds - 1 }));
      setAlerts([...alerts, 'MEDICINE ADMINISTERED (-1 MEDS)']);
      triggerEffect('MEDS');
    } else {
      setAlerts([...alerts, 'ERR: NO MEDICINE REMAINING!']);
    }
  };

  const handleReset = () => {
    setHealth(5);
    setLuminescence(3);
    setHunger(1);
    setWeight(4.2);
    setInventory({ food: 5, meds: 2 });
    setAlerts(['SYSTEM REBOOTED', 'PH LEVEL STABLE', 'GROWTH DETECTED']);
    setActiveModal(null);
  };

  const cycleLightMode = () => {
    const modes = ['AUTO', 'ON', 'OFF'];
    const currentIndex = modes.indexOf(lightMode);
    setLightMode(modes[(currentIndex + 1) % modes.length]);
  };

  const cycleFlowMode = () => {
    const modes = ['HIGH', 'MED', 'LOW'];
    const currentIndex = modes.indexOf(flowMode);
    setFlowMode(modes[(currentIndex + 1) % modes.length]);
  };

  const cycleO2Mode = () => {
    const modes = ['NRML', 'HIGH', 'LOW'];
    const currentIndex = modes.indexOf(o2Mode);
    setO2Mode(modes[(currentIndex + 1) % modes.length]);
  };

  const getSquidStyle = () => {
    const animSpeed = flowMode === 'HIGH' ? '1s' : flowMode === 'MED' ? '3s' : '6s';
    const scale = Math.max(0.6, 1 - (hunger * 0.1)) * (visualEffect === 'FEED' ? 1.2 : 1);
    const flickerAnim = o2Mode === 'LOW' ? ', flicker 0.2s steps(2, start) infinite' : '';
    const moveType = flowMode === 'HIGH' ? 'shake' : 'float';

    // Play effect increases luminescence glow
    const currentGlow = visualEffect === 'PLAY' ? (luminescence + 4) : luminescence;

    return {
      width: '80px',
      height: '80px',
      imageRendering: 'pixelated',
      background: visualEffect === 'MEDS' ? 'var(--lcd-ink)' : (health < 2 ? 'var(--lcd-dim)' : 'var(--lcd-ink)'),
      clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 60%, 80% 100%, 60% 80%, 40% 100%, 20% 60%, 0% 60%, 0% 20%)',
      animation: gameActive ? 'none' : `${moveType} ${animSpeed} ease-in-out infinite${flickerAnim}`,
      transform: gameActive ? `translate(-50%, -50%) scale(${scale})` : `scale(${scale})`,
      position: gameActive ? 'absolute' : 'relative',
      left: gameActive ? `${playerPos.x}%` : 'auto',
      top: gameActive ? `${playerPos.y}%` : 'auto',
      opacity: Math.max(0.3, health / 6),
      filter: `drop-shadow(0 0 ${currentGlow * 3}px var(--lcd-ink))`,
      transition: gameActive ? 'none' : 'all 0.3s ease',
      border: visualEffect === 'CLEAN' ? '4px solid var(--lcd-ink)' : 'none',
      zIndex: 10
    };
  };

  const getContainerStyle = () => {
    const isOff = lightMode === 'OFF';
    const isAuto = lightMode === 'AUTO';

    return {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      backgroundImage: 'radial-gradient(var(--lcd-dim) 1px, transparent 1px)',
      backgroundSize: flowMode === 'HIGH' ? '10px 10px' : '4px 4px',
      minHeight: '300px',
      filter: isOff ? 'brightness(0.1) contrast(1.5)' : (isAuto ? 'brightness(0.8)' : 'none'),
      backgroundColor: visualEffect === 'CLEAN' ? 'var(--lcd-dim)' : 'transparent',
      transition: 'all 0.5s ease',
      overflow: 'hidden'
    };
  };

  const Modal = ({ title, onClose, children }) => (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <Panel
          header
          title={title}
          subtitle="OVERLAY_MODE"
          footer={true}
        >
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '16px',
            cursor: 'pointer',
            fontSize: '14px'
          }} onClick={onClose}>[X]</div>
          <PanelBody>
            {children}
          </PanelBody>
        </Panel>
      </div>
    </div>
  );

  return (
    <div className="app-container">
      {activeModal === 'SYSTEM' && (
        <Modal title="SYSTEM MENU" onClose={() => setActiveModal(null)}>
          <p style={{ marginBottom: '24px' }}>SYSTEM VERSION: v2.4.1-BETA</p>
          <p style={{ marginBottom: '24px' }}>UPTIME: {formatAge()}</p>
          <div style={{ border: '2px dashed var(--lcd-ink)', padding: '16px' }}>
            <p style={{ margin: '0 0 16px 0' }}>DANGER ZONE</p>
            <Button primary onClick={handleReset} style={{ width: '100%' }}>REBOOT SYSTEM (RESET)</Button>
          </div>
        </Modal>
      )}

      {activeModal === 'LOGS' && (
        <Modal title="EVENT LOGS" onClose={() => setActiveModal(null)}>
          {alerts.length === 0 ? <p>NO LOGS FOUND.</p> : (
            <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
              {alerts.map((log, i) => (
                <div key={i} style={{
                  padding: '8px 0',
                  borderBottom: '1px solid var(--lcd-dim)',
                  display: 'flex',
                  gap: '8px'
                }}>
                  <span style={{ opacity: 0.5 }}>{Math.floor(Math.random() * 24)}:{Math.floor(Math.random() * 60)}</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}

      {activeModal === 'INVENTORY' && (
        <Modal title="STORAGE" onClose={() => setActiveModal(null)}>
          <ListRow label="NUTRIENT PASTE" value={`x${inventory.food.toString().padStart(2, '0')}`} />
          <ListRow label="MEDICINE VIALS" value={`x${inventory.meds.toString().padStart(2, '0')}`} />
          <ListRow label="WATER FILTERS" value="x08" />
          <ListRow label="GROWTH SERUM" value="x01" />
          <ListRow label="TOYS (BALL)" value="x01" />
          <div style={{ marginTop: '24px', textAlign: 'center', opacity: 0.5 }}>
            &lt; STORAGE CAPACITY: {((inventory.food + inventory.meds + 10) / 100 * 100).toFixed(0)}% &gt;
          </div>
        </Modal>
      )}

      <div className="main-grid">
        <header className="header">
          <h1 style={{ fontFamily: "'Press Start 2P', cursive", textTransform: 'uppercase', lineHeight: '1.4', fontSize: '20px', margin: 0 }}>GLOW SQUID</h1>
          <div style={{ display: 'flex', gap: 'var(--space-l)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-s)', fontSize: '18px' }}>
              <span style={{ fontSize: '12px', fontFamily: "'Press Start 2P'" }}>POS:</span>
              <span>{getDynamicPos()}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-s)', fontSize: '18px' }}>
              <IconBattery />
              <span>{getDynamicBattery()}%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-s)', fontSize: '18px' }}>
              <IconSat />
            </div>
          </div>
        </header>

        <aside className="sidebar-left">
          <Panel header title="VITALS">
            <PanelBody>
              <StatGroup label="HEALTH" segments={6} filled={health} />
              <StatGroup label="LUMINESCENCE" segments={6} filled={luminescence} />
              <StatGroup label="HUNGER" segments={6} filled={hunger} />
              <ListRow label="AGE" value={formatAge()} />
              <ListRow label="WEIGHT" value={`${currentWeight}g`} />
            </PanelBody>
          </Panel>
        </aside>

        <main className="main-content">
          <Panel header title="SPECIMEN: GLOW-SQUID" subtitle={gameActive ? `SCORE: ${gameScore}` : "ID: #8842-A"}>
            <div style={getContainerStyle()}>
              <div style={getSquidStyle()}></div>

              {gameActive && gameItems.map(item => (
                <div key={item.id} style={{
                  position: 'absolute',
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '35px',
                  height: '35px',
                  background: item.type === 'FOOD' ? 'var(--lcd-ink)' : (item.type === 'BOMB' ? '#8B0000' : 'transparent'),
                  border: item.type === 'MEDS' ? '3px solid var(--lcd-ink)' : (item.type === 'BOMB' ? '3px solid #000' : 'none'),
                  borderRadius: '50%',
                  animation: item.type === 'BOMB' ? 'shake 0.5s ease-in-out infinite' : 'float 2s ease-in-out infinite',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Press Start 2P'",
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: item.type === 'FOOD' ? 'var(--lcd-bg)' : (item.type === 'BOMB' ? '#fff' : 'var(--lcd-ink)'),
                  boxShadow: item.type === 'BOMB' ? '0 0 15px rgba(139, 0, 0, 0.8)' : '0 0 10px rgba(0,0,0,0.3)'
                }}>
                  {item.type === 'FOOD' ? '🍖' : (item.type === 'BOMB' ? '💣' : '💊')}
                </div>
              ))}

              {!gameActive && (
                <>
                  <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                    <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px', display: 'block' }}>DEPTH</span>
                    <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{getDynamicDepth()}m</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: '20px', right: '20px', textAlign: 'right' }}>
                    <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px', display: 'block' }}>TEMP</span>
                    <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{getDynamicTemp()}°C</span>
                  </div>
                </>
              )}

              {gameActive && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontFamily: "'Press Start 2P'",
                  fontSize: '10px',
                  textAlign: 'center',
                  background: 'rgba(13, 13, 13, 0.7)',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  color: 'var(--lcd-bg)',
                  zIndex: 20
                }}>
                  <div className="desktop-hint">⬆️⬇️⬅️➡️ ARROW KEYS TO MOVE</div>
                  <div style={{ marginTop: '4px', fontSize: '8px' }}>
                    TIME: {gameTime}s | ITEMS: {gameItems.length}
                  </div>
                  <div style={{ marginTop: '4px', fontSize: '7px', color: '#ff6b6b' }}>
                    AVOID 💣 BOMBS! | EAT 🍖 FOOD!
                  </div>
                </div>
              )}

              {gameActive && (
                <div className="mobile-controls" style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 60px)',
                  gridTemplateRows: 'repeat(2, 60px)',
                  gap: '10px',
                  zIndex: 30
                }}>
                  <div style={{ gridColumn: '2' }}>
                    <Button onClick={() => movePlayer('up')} style={{ width: '60px', height: '60px', padding: 0, fontSize: '20px' }}>▲</Button>
                  </div>
                  <div style={{ gridRow: '2', gridColumn: '1' }}>
                    <Button onClick={() => movePlayer('left')} style={{ width: '60px', height: '60px', padding: 0, fontSize: '20px' }}>◀</Button>
                  </div>
                  <div style={{ gridRow: '2', gridColumn: '2' }}>
                    <Button onClick={() => movePlayer('down')} style={{ width: '60px', height: '60px', padding: 0, fontSize: '20px' }}>▼</Button>
                  </div>
                  <div style={{ gridRow: '2', gridColumn: '3' }}>
                    <Button onClick={() => movePlayer('right')} style={{ width: '60px', height: '60px', padding: 0, fontSize: '20px' }}>▶</Button>
                  </div>
                </div>
              )}

              {isDead && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(139, 0, 0, 0.95)',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '4px solid #000',
                  textAlign: 'center',
                  fontFamily: "'Press Start 2P'",
                  color: '#fff',
                  zIndex: 100
                }}>
                  <div style={{ fontSize: '16px', marginBottom: '12px' }}>☠️ SPECIMEN DECEASED ☠️</div>
                  <div style={{ fontSize: '10px', marginBottom: '16px', opacity: 0.8 }}>
                    FINAL SCORE: {gameScore}
                  </div>
                  <div style={{ fontSize: '8px', color: '#ffeb3b' }}>
                    CLICK PLAY TO REVIVE
                  </div>
                </div>
              )}
            </div>
          </Panel>
        </main>

        <aside className="sidebar-right">
          <Panel header title="ACTIONS">
            <PanelBody>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-s)' }}>
                <Button primary onClick={handleFeed}>FEED</Button>
                <Button onClick={handlePlay} style={{ background: gameActive ? 'var(--lcd-ink)' : 'transparent', color: gameActive ? 'var(--lcd-bg)' : 'var(--lcd-ink)' }}>
                  {gameActive ? 'STOP' : 'PLAY'}
                </Button>
                <Button onClick={handleClean}>CLEAN</Button>
                <Button onClick={handleMeds}>MEDS</Button>
              </div>

              <br />
              <div style={{ paddingLeft: 0, paddingRight: 0, marginBottom: 'var(--space-s)' }}>
                <h2 style={{ fontFamily: "'Press Start 2P', cursive", textTransform: 'uppercase', lineHeight: '1.4', fontSize: '14px', margin: '0 0 8px 0' }}>ENVIRONMENT</h2>
              </div>

              <ListRow
                label="LIGHT"
                action={<Button onClick={cycleLightMode} style={{ padding: '4px 8px' }}>{lightMode}</Button>}
              />
              <ListRow
                label="FLOW"
                action={<Button onClick={cycleFlowMode} style={{ padding: '4px 8px' }}>{flowMode}</Button>}
              />
              <ListRow
                label="O2"
                action={<Button onClick={cycleO2Mode} style={{ padding: '4px 8px' }}>{o2Mode}</Button>}
              />

              <div style={{ marginTop: 'var(--space-m)', padding: 'var(--space-s)', border: '2px dashed var(--lcd-ink)' }}>
                <h3 style={{ fontFamily: "'Press Start 2P', cursive", textTransform: 'uppercase', lineHeight: '1.4', fontSize: '10px', margin: '0 0 8px 0' }}>ALERTS</h3>
                {alerts.slice(-2).map((alert, i) => (
                  <p key={i} style={{ margin: 0, fontSize: '16px' }}>&gt; {alert}</p>
                ))}
              </div>
            </PanelBody>
          </Panel>
        </aside>

        <nav className="nav-bar">
          <button onClick={() => setActiveModal('SYSTEM')} style={{
            background: 'var(--lcd-ink)',
            color: 'var(--lcd-bg)',
            padding: '12px 24px',
            borderRadius: '20px',
            fontFamily: "'Press Start 2P', cursive",
            fontSize: '12px',
            border: 'none',
            cursor: 'pointer'
          }}>SYSTEM MENU</button>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setActiveModal('LOGS')} style={{
              background: 'var(--lcd-ink)',
              color: 'var(--lcd-bg)',
              padding: '12px 24px',
              borderRadius: '20px',
              fontFamily: "'Press Start 2P', cursive",
              fontSize: '12px',
              border: 'none',
              cursor: 'pointer'
            }}>LOGS</button>
            <button onClick={() => setActiveModal('INVENTORY')} style={{
              background: 'var(--lcd-ink)',
              color: 'var(--lcd-bg)',
              padding: '12px 24px',
              borderRadius: '20px',
              fontFamily: "'Press Start 2P', cursive",
              fontSize: '12px',
              border: 'none',
              cursor: 'pointer'
            }}>INVENTORY</button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default App;
